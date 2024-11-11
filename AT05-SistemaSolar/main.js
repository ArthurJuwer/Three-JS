import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// importar Imagens
import starsImage from './images/stars.jpg';
import sunImage from './images/sunmap.jpg';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0,0,5)

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setAnimationLoop(animate)

const textureLoader = new THREE.TextureLoader();
const sunGeometry = new THREE.SphereGeometry(1,32,32)

const sunMap = textureLoader.load(sunImage);
sunMap.colorSpace = THREE.SRGBColorSpace;
// deixar visualmente mais bonito daria para colocar direto no sunMaterial

const sunMaterial = new THREE.MeshBasicMaterial(
    {
        map: sunMap
    }
)

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)

scene.add(sunMesh)



function animate(){
    orbit.update()
    
    rotatePlanets(sunMesh, 0.01)

    renderer.render(scene, camera)
}

function rotatePlanets(planeta, gravidade){
    planeta.rotation.y += gravidade
}

