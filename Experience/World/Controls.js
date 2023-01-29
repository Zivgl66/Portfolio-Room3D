import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Experience from "../Experience";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
      if (child.type === "PointLight") {
        this.pointLight = child;
      }
    });
    this.floor = this.experience.world.floor.plane;
    this.circleFirst = this.experience.world.floor.circleFirst;

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";
    document.querySelector(".page-wrapper").setAttribute("asscroll", "");
    this.setSmoothScroll();
    this.setScrollTriger();
  }

  setupASScroll() {
    const asscroll = new ASScroll({
      ease: 0.09,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }
  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTriger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px) ": () => {
        //resets ------------------------------------------------
        this.room.scale.set(0.19, 0.19, 0.19);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.4;
        this.rectLight.height = 0.4;

        //first section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "-=600px",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0013;
          },
          y: () => {
            return 0.1;
          },
          duration: 3,
        });

        //second section ------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "-=800px",
            end: "+=100px",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: () => {
                return 0.5;
              },
              z: () => {
                return this.sizes.height * 0.0024;
              },
              y: () => {
                return -1.2;
              },
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.7,
              y: 0.7,
              z: 0.7,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.5 * 2,
              height: 0.7 * 2,
            },
            "same"
          );

        //third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.camera.orthographicCamera.position,
            {
              y: 1.5,
              x: -2.5,
              z: 3.4,
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              y: 0.4,
              x: 0.4,
              z: 0.4,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: () => {
                return 2.5;
              },
              z: () => {
                return this.sizes.height * -0.005;
              },
            },
            "same"
          );
      },

      //Medium screen -------------------------------------------

      "(min-width: 600px) and (max-width: 968px)": () => {
        //resets ------------------------------------------------
        this.room.scale.set(0.1, 0.1, 0.1);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.15;
        this.rectLight.height = 0.15;

        //first section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.scale, {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        });
        this.firstMoveTimeline
          .to(this.room.position, {
            x: () => {
              return -0.1;
            },
            z: () => {
              return this.sizes.height * 0.0024;
            },
          })
          .to(
            this.rectLight,
            {
              width: 0.5 * 1.5,
              height: 0.7 * 1.5,
            },
            "same"
          );

        //second section ------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "+=1500px",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }).to(
          this.room.scale,
          {
            x: 0.28,
            y: 0.28,
            z: 0.28,
          },
          "same"
        );

        //third section -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "-=1000px",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.15,
              y: 0.15,
              z: 0.15,
            },
            "same"
          )
          .to(
            this.camera.orthographicCamera.position,
            {
              y: 0.53,
              x: -1.2,
              z: 5.8,
            },
            "same"
          )
          .to(
            this.camera.orthographicCamera.rotation,
            {
              _y: 60,
              _x: 89,
              _z: 66.8,
            },
            "same"
          );
      },

      // Mobile  ------------------------------------------------
      "(max-width: 599px)": () => {
        //Resets- reset room size for mobile
        this.room.scale.set(0.08, 0.08, 0.08);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.15;
        this.rectLight.height = 0.15;

        //first section -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "-=500px",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(this.room.scale, {
            x: 0.2,
            y: 0.2,
            z: 0.2,
          })
          .to(
            this.rectLight,
            {
              width: 0.5 * 2,
              height: 0.5 * 2,
            },
            "same"
          )
          .to(this.room.position, {
            x: () => {
              return 0.54;
            },
            y: () => {
              return 0.5;
            },
            z: () => {
              return 2.4;
            },
          });

        //second section ---------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "+=1000px",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
          // .to(
          //   this.room.scale,
          //   {
          //     x: 0.5,
          //     y: 0.5,
          //     z: 0.5,
          //   },
          //   "same"
          // )
          // .to(
          //   this.rectLight,
          //   {
          //     width: 0.5 * 2.5,
          //     height: 0.5 * 2.5,
          //   },
          //   "same"
          // )
          .to(
            this.room.position,
            {
              x: () => {
                return 0.3;
              },
              z: () => {
                return -0.5;
              },
            },
            "same"
          );
        // .to(this.camera.orthographicCamera.position, {
        //   z: 5,
        //   y: 5,
        //   x: 1,
        // });
      },

      //All
      all: () => {
        // progress bar --------------------------------------------------
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: " top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: " bottom top",
                scrub: 1,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: " top top",
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: " bottom top",
                scrub: 1,
              },
            });
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });
        });

        //Circle animations ---------------------------------------

        //first circle -----------------------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "-=300px",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(this.circleFirst.scale, {
            x: 5,
            y: 5,
            z: 5,
          })
          .to(this.floor.position, {
            y: -3,
          });

        //second circle ------------------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "-=1200px",
            end: "-=500px",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.circleFirst.position,
            {
              y: -3,
            },
            "changeCircle"
          )
          .to(
            this.circleFirst.material.color,
            {
              r: 0.39,
              g: 0.48,
              b: 0.83,
            },
            "changeCircle"
          );

        //third circle -----------------------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "+=1000px",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.circleFirst.material.color,
            {
              r: 0.48,
              g: 0.86,
              b: 0.67,
            },
            "changeCircle"
          )
          .to(
            this.circleFirst.position,
            {
              y: -1.7,
            },
            "changeCircle"
          );

        //Mini platform animation ------------------------------------
        this.allMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "-=800px",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "Extra_Floor")
            this.first = GSAP.to(child.children[0].position, {
              x: -0.001,
              y: 0.02,
              z: -0.3,
              ease: "back.out(2)",
              duration: 0.7,
            });
          if (child.name === "Extra_Floor") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.7,
            });
          }
          if (child.name === "mail_box") {
            this.forth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.7,
            });
          }
          if (child.name === "Ground") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.7,
            });
          }
        });
        this.fifth = GSAP.to(this.pointLight, {
          intensity: 0.3,
        });
        this.allMoveTimeline.add(this.first);
        this.allMoveTimeline.add(this.second);
        this.allMoveTimeline.add(this.third);
        this.allMoveTimeline.add(this.forth);
        this.allMoveTimeline.add(this.fifth);
      },
    });
  }

  resize() {}

  update() {}
}
