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
    const material2 = new THREE.MeshStandardMaterial({ color: 0x526dbd });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x7adbac });
    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleSecond = new THREE.Mesh(geometry, material2);
    this.circleThird = new THREE.Mesh(geometry, material3);
    this.circleFirst.position.y = -0.25;
    this.circleSecond.position.y = -0.24;
    this.circleSecond.position.x = 1.5;
    this.circleThird.position.y = -0.23;
    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);
    this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x =
      -Math.PI / 2;
    this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;
    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  resize() {}

  update() {}
}
