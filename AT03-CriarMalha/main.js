import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, render.domElement);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

camera.position.set(0, 2, 5);


const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshBasicMaterial(
    { 
        color: 0xFFFFFF, 
        side: THREE.DoubleSide
    }
)

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = 0.5 * Math.PI

scene.add(plane)

const grid = new THREE.GridHelper(30)
scene.add(grid)


function animate() {
    orbit.update();
    render.render(scene, camera);
    requestAnimationFrame(animate);  
}

animate();