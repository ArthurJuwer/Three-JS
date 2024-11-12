import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// importar Imagen
import sunImage from './images/sunmap.jpg';
import mercuryImage from './images/mercurymap.jpg';
import venusImage from './images/venusmap.jpg';
import earthImage from './images/earthmap.jpg';
import marsImage from './images/marsmap.jpg';
import jupiterImage from './images/jupitermap.jpg';
import saturnImage from './images/saturnmap.jpg';
import saturnRingImage from './images/saturnringmap.jpg';
import uranusImage from './images/uranusmap.jpg';
import uranusRingImage from './images/uranusringmap.jpg';
import neptuneImage from './images/neptunemap.jpg';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-90,140,140)

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate)

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update()

const cubeTextureLoader = new THREE.CubeTextureLoader();

const starsBackground = cubeTextureLoader.load([
    'https://i.imgur.com/gLGNnkp.jpeg',
    'https://i.imgur.com/gLGNnkp.jpeg',
    'https://i.imgur.com/gLGNnkp.jpeg',
    'https://i.imgur.com/gLGNnkp.jpeg',
    'https://i.imgur.com/gLGNnkp.jpeg',
    'https://i.imgur.com/gLGNnkp.jpeg'
]);

scene.background = starsBackground;

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const textureLoader = new THREE.TextureLoader();

const sunGeometry = new THREE.SphereGeometry(16,30,30)
const sunMap = textureLoader.load(sunImage);
sunMap.colorSpace = THREE.SRGBColorSpace;

const sunMaterial = new THREE.MeshBasicMaterial( { map: sunMap } )
const sun = new THREE.Mesh(sunGeometry, sunMaterial)

const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 300);
scene.add(sun)
scene.add(pointLight)

function createPlanete(size, image, position, ring){

    const planetGeometry = new THREE.SphereGeometry(size,30,30)

    const planetMap = textureLoader.load(image);

    planetMap.colorSpace = THREE.SRGBColorSpace;

    const planetMaterial = new THREE.MeshStandardMaterial( { map: planetMap } )

    const mesh = new THREE.Mesh(planetGeometry, planetMaterial)

    const obj = new THREE.Object3D();

    if(ring){
        const planetRingGeometry = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32)
        const ringMap = textureLoader.load(ring.image);
        ringMap.colorSpace = THREE.SRGBColorSpace;
        const planetRingMaterial = new THREE.MeshStandardMaterial( { map: ringMap, side: THREE.DoubleSide } )
        const planetRingMesh = new THREE.Mesh(planetRingGeometry, planetRingMaterial)
        
        obj.add(planetRingMesh);
        planetRingMesh.position.x = position;
        planetRingMesh.rotation.x = -0.5 * Math.PI;
    }

    obj.add(mesh);

    scene.add(obj)

    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, mercuryImage, 28)
const venus = createPlanete(5.8, venusImage, 44)
const earth = createPlanete(6, earthImage, 62)
const mars = createPlanete(4, marsImage, 78)
const jupiter = createPlanete(12, jupiterImage, 100)
const saturn = createPlanete(10, saturnImage, 138, {
    innerRadius: 10, 
    outerRadius: 20, 
    image: saturnRingImage}
)
const uranus = createPlanete(7, uranusImage, 176, {
    innerRadius: 7, 
    outerRadius: 12, 
    image: uranusRingImage
})
const neptune = createPlanete(7, neptuneImage, 200)



function animate(){
    
    
    sun.rotateY(0.004)

    mercury.mesh.rotateY(0.004)
    mercury.obj.rotateY(0.04)

    venus.mesh.rotateY(0.002)
    venus.obj.rotateY(0.015)

    earth.mesh.rotateY(0.02)
    earth.obj.rotateY(0.01)

    mars.mesh.rotateY(0.018)
    mars.obj.rotateY(0.008)

    jupiter.mesh.rotateY(0.04)
    jupiter.obj.rotateY(0.002)

    saturn.mesh.rotateY(0.0038)
    saturn.obj.rotateY(0.0009)

    uranus.mesh.rotateY(0.03)
    uranus.obj.rotateY(0.0004)

    neptune.mesh.rotateY(0.032)
    neptune.obj.rotateY(0.0001)

    renderer.render(scene, camera)
}


