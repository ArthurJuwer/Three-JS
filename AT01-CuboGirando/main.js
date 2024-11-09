import * as THREE from 'three';

const cena = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderizador = new THREE.WebGLRenderer();

renderizador.setSize(window.innerWidth, window.innerHeight)

renderizador.setAnimationLoop( animacaoFinal )

document.body.appendChild( renderizador.domElement )

const medidas = new THREE.BoxGeometry( 1 , 1 ,1)
const cor = new THREE.MeshBasicMaterial( { color: 0x10ffff } )


const cubo = new THREE.Mesh( medidas, cor )

cena.add(cubo)

camera.position.z = 5

function animacaoFinal(){
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;

    renderizador.render(cena, camera)
}
