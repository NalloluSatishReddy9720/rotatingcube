import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()

const cubeGeometry = new THREE.BoxGeometry(1,1,1)

const cubeMaterial = new THREE.MeshBasicMaterial({color:"red", wireframe:true})

const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial)


scene.add(cubeMesh)



const axesHelper = new THREE.AxesHelper(2)
cubeMesh.add(axesHelper);

const camera = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,0.1,30)

const aspectRatio = window.innerWidth / window.innerHeight

// const camera = new THREE.OrthographicCamera(
//   -1*aspectRatio,
//   1*aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// )

camera.position.z = 5

scene.add(camera)

const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas : canvas,
  antialias : true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const controls = new OrbitControls(camera,canvas)

controls.enableDamping = true
// controls.autoRotate= true

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth,window.innerHeight)
})


//initialize the clock

const clock = new THREE.Clock()
let previousTime = 0


//render the scene 
const renderloop = ()=>{
  const currentTime = clock.getElapsedTime()
  const delta = currentTime - previousTime
  previousTime = currentTime

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20
  // cubeMesh.scale.x = Math.sin(currentTime)

  controls.update()

  renderer.render(scene,camera)
  window.requestAnimationFrame(renderloop)
}

renderloop()
