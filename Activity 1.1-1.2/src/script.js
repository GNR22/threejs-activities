import * as THREE from 'three'

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
renderer.render(scene, camera)