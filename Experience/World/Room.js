import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = [];
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      if (child.name === "Aquarium_water") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x2b61bb);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      if (child.name === "computer_screen") {
        child.children[0].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "Extra_Floor") {
        child.children[0].position.x = 0;
        child.children[0].position.y = 0;
        child.children[0].position.z = 6;
      }

      child.scale.set(0, 0, 0);
      
      if (child.name === "Cube") {
        child.position.set(0, 0.8, 0);
        child.rotation.y = -Math.PI / 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    const width = 0.4;
    const height = 0.4;
    const intensity = 2.5;
    const rectLight = new THREE.RectAreaLight(
      0xfffcc1,
      intensity,
      width,
      height
    );
    rectLight.position.set(4.1189, 3.74399, 3.5);
    rectLight.rotation.x = -Math.PI / 2.1;
    rectLight.rotation.z = Math.PI / 4;

    this.actualRoom.add(rectLight);
    this.roomChildren["rectLight"] = rectLight;

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.19, 0.19, 0.19);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[6]);
    this.swim.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
    this.mixer.update(this.time.delta * 0.0009);
  }
}
