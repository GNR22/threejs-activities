import * as THREE from 'three'
import './style.css'
import gsap from 'gsap'


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Render!
//renderer.render(scene, camera)


// tick is like a game loop or animation loop.
/*
let time = Date.now()
const tick = () =>
{

// Time
const currentTime = Date.now()
const deltaTime = currentTime - time
time = currentTime
// Update objects
mesh.rotation.y += 0.01 * deltaTime // 0.01 is how fast the donut spins
// Render
renderer.render(scene, camera)
// Call tick again on the next frame
window.requestAnimationFrame(tick)
}
tick()
*/

/*
// Clock method
const clock = new THREE.Clock()
const tick = () =>
{
const elapsedTime = clock.getElapsedTime()
mesh.rotation.y = elapsedTime

renderer.render(scene, camera)
window.requestAnimationFrame(tick)
}
tick()
*/

/*
//Bouncing donut 
const clock = new THREE.Clock()
const tick = () =>
{
const elapsedTime = clock.getElapsedTime()
mesh.position.x = Math.cos(elapsedTime)
mesh.position.y = Math.sin(elapsedTime)

renderer.render(scene, camera)
window.requestAnimationFrame(tick)
}
tick()
*/

/*
//clock method but like the camera
const clock = new THREE.Clock()
const tick = () =>
{
const elapsedTime = clock.getElapsedTime()
mesh.position.x = Math.cos(elapsedTime)
mesh.position.y = Math.sin(elapsedTime)
camera.lookAt(mesh.position)

renderer.render(scene, camera)
window.requestAnimationFrame(tick)
}
tick()
*/

/*
//clock method but like the camera
const clock = new THREE.Clock()
// Handles delays and transition
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
const tick = () =>
{
const elapsedTime = clock.getElapsedTime()
mesh.position.x = Math.cos(elapsedTime)
mesh.position.y = Math.sin(elapsedTime)
camera.lookAt(mesh.position)

renderer.render(scene, camera)
window.requestAnimationFrame(tick)
}
tick()
*/


//Bouncing vertical donut haha
const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.position.x = Math.sin(elapsedTime * 2); //move left and right
  mesh.position.y = Math.cos(elapsedTime * 4); // move up and down
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
