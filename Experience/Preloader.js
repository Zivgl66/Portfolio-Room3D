import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convertSpan from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }
  setAssets() {
    convertSpan(document.querySelector(".intro-text"));
    convertSpan(document.querySelector(".hero-main-title"));
    convertSpan(document.querySelector(".hero-main-description"));
    convertSpan(document.querySelector(".first-sub"));
    convertSpan(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animate-this", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "bakc.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else if (this.device === "tablet") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "bakc.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else if (this.device === "mobile") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 0.7,
            y: 0.7,
            z: 0.7,
            ease: "bakc.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline
        .to(".intro-text .animate-this", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.8)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "toggles"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "toggles"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          ".intro-text .animate-this",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.8)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 5.5,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0.638711,
            y: 6.5619,
            z: 1.3243,
          },
          "same"
        )
        .to(this.roomChildren.wall.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
        })
        .to(
          this.roomChildren.cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "same"
        )
        .to(
          ".hero-main-title .animate-this",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.8)",
          },
          "introtext"
        )
        .to(
          ".hero-main-description .animate-this",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.8)",
          },
          "introtext"
        )
        .to(
          ".first-sub .animate-this",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.8)",
          },
          "introtext"
        )
        .to(
          ".second-sub .animate-this",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.8)",
          },
          "introtext"
        )
        .to(
          this.roomChildren.aquarium_box.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.2,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.aquarium_water.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.3,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.fish.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.shlefs.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 0.5,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.floor_items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.3,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.clock.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.2,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.desks.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.3,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.chair_sit.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "chair"
        )
        .to(
          this.roomChildren.chair_sit.rotation,
          {
            y: 4 * Math.PI + Math.PI / 4,
            ease: "power2.out",
            duration: 1,
          },
          "chair"
        )
        .to(
          this.roomChildren.desk_stuff.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "power1.out",
            duration: 0.3,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.computer_screen.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.3,
          },
          ">-0.1"
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initalY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    this.roomChildren.rectLight.width = 0;
    this.roomChildren.rectLight.height = 0;
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }
  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(0.19, 0.19, 0.19);
    } else if (this.device === "tablet") {
      this.room.scale.set(0.1, 0.1, 0.1);
    } else if (this.device === "mobile") {
      this.room.scale.set(0.08, 0.08, 0.08);
    }
  }

  update() {
    if (this.moveFlag) this.move();
    if (this.scaleFlag) this.scale();
  }
}
