import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Code below up to sizes is hardocded version of donut
const geometry = new THREE.BufferGeometry()


const majorRadius = 1     
const minorRadius = 0.4  
const majorSegments = 64  
const minorSegments = 32  

const positions = []
const normals = []
const uvs = []

for (let j = 0; j <= majorSegments; j++) {
  const v = (j / majorSegments) * 2 * Math.PI
  const cosV = Math.cos(v)
  const sinV = Math.sin(v)

  for (let i = 0; i <= minorSegments; i++) {
    const u = (i / minorSegments) * 2 * Math.PI
    const cosU = Math.cos(u)
    const sinU = Math.sin(u)

    const x = (majorRadius + minorRadius * cosU) * cosV
    const y = (majorRadius + minorRadius * cosU) * sinV
    const z = minorRadius * sinU

    positions.push(x, z, y) 
  }
}


const indices = []
for (let j = 0; j < majorSegments; j++) {
  for (let i = 0; i < minorSegments; i++) {
    const a = (minorSegments + 1) * j + i
    const b = (minorSegments + 1) * (j + 1) + i
    const c = (minorSegments + 1) * (j + 1) + i + 1
    const d = (minorSegments + 1) * j + i + 1
    indices.push(a, b, d)
    indices.push(b, c, d)
  }
}

geometry.setIndex(indices)
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
geometry.computeVertexNormals()


const material = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// fullscreen
window.addEventListener('dblclick', () =>
  !document.fullscreenElement
    ? canvas.requestFullscreen()
    : document.exitFullscreen()
);

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()