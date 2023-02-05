import * as THREE from "three";

import Experience from "../Experience";
import GSAP from "gsap";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunLight();
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#FFFCC1", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 60;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.15;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight("#FFFCC1", 2);
    this.scene.add(this.ambientlight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.08888888,
        g: 0.121111111,
        a: 0.111111111,
      });
      GSAP.to(this.ambientlight.color, {
        r: 0.01111,
        g: 0.01111,
        a: 0.01111,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.ambientlight.color, {
        r: 1,
        g: 1,
        a: 1,
      });
    }
  }
  resize() {}

  update() {}
}
