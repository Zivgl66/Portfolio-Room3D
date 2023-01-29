import * as THREE from "three";

import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -0.36;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0xce3c3c });
    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleFirst.position.y = -0.23;
    this.circleFirst.position.x = 1;
    this.circleFirst.scale.set(0, 0, 0);
    this.circleFirst.rotation.x = -Math.PI / 2;
    this.circleFirst.receiveShadow = true;
    this.scene.add(this.circleFirst);
    console.log(this.circleFirst.material.color);
  }

  resize() {}

  update() {}
}
