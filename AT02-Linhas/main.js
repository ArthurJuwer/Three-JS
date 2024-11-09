import * as THREE from "three";

const renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderizador.domElement )

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1 , 500)

camera.position.set(0, 0, 100)
camera.lookAt(0,0,0)

const cena = new THREE.Scene()

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } )

const pontos = []

pontos.push( new THREE.Vector3( - 10, 0, 0 ) )
pontos.push( new THREE.Vector3( 0, 10, 0 ) )
pontos.push( new THREE.Vector3( 10, 0, 0 ) )

const geometria = new THREE.BufferGeometry().setFromPoints( pontos )

const linha  = new THREE.Line (geometria, material)

cena.add(linha)
renderizador.render(cena, camera)