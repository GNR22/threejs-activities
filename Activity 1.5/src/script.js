import * as THREE from 'three'
import './style.css'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


console.log('Hello Three.js')
console.log(THREE)

// Scene
const scene = new THREE.Scene()

// Object - Red Cube
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100) // radius, tube, radialSegments, tubularSegments
const material = new THREE.MeshBasicMaterial({ color: 'yellow' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Size sa shape og background 
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1,100)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


/*
  // Cursor 
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
cursor.y = - (event.clientY / sizes.height - 0.5)
})

const tick = () => {
  // Move camera based on cursor position
  camera.position.x = cursor.x * 10    // horizontal move
  camera.position.y = -cursor.y * 10  // vertical move
  camera.lookAt(mesh.position)         // perspective of the donut 

  renderer.render(scene, camera)

  // loop
  window.requestAnimationFrame(tick)
}
tick()
*/



/*
 // Cursor (FULL ROTATIONS USING Math.PI)
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
cursor.y = - (event.clientY / sizes.height - 0.5)
})

const tick = () => {
  // Move camera based on cursor position
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)

  // loop
  window.requestAnimationFrame(tick)
}
tick()
*/

// Currsor but more on swiping movement
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const tick = () =>
{
controls.update()              // update OrbitControls
  renderer.render(scene, camera) // draw the scene
  window.requestAnimationFrame(tick) // repeat forever

}
tick()