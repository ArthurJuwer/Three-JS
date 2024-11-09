import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 5);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
const cubeCreator = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeCreator);

const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();
const cubeId = cubeCreator.id;

let isHovered = false;

function animate(time) {
    cubeCreator.rotation.x = time / 1000;
    cubeCreator.rotation.y = time / 1000;

    orbit.update();
    renderer.render(scene, camera);

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);

    let cubeIntersected = false;

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === cubeId) {
            intersects[i].object.material.color.set(0xFF0000);
            cubeIntersected = true;
        }
    }
    if (!cubeIntersected && isHovered) {
        cubeCreator.material.color.set(0xAAAAAA);
    }
    isHovered = cubeIntersected;

    console.log(intersects)
}

renderer.setAnimationLoop(animate);
