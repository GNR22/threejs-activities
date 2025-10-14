import * as THREE from 'three'

console.log('Hello Three.js')
console.log(THREE)

// Scene
const scene = new THREE.Scene()

// Object - donut
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100) // radius, tube, radialSegments, tubularSegments
const material = new THREE.MeshBasicMaterial({ color: 'yellow' })

// Positioning
const mesh = new THREE.Mesh(geometry, material)
// Positioning
/*
//right (x)
mesh.position.x = .5
//upward (y)
mesh.position.y = 1
//backward (z)
mesh.position.z = .5


//mesh.position.set(.5,1,.5)

// SCALE
mesh.scale.x = 2
mesh.scale.y = .5
mesh.scale.z = .5

// ROTATION
mesh.rotation.x = Math.PI * .25
mesh.rotation.y = Math.PI * .25
*/

// Combining transformations(position,scale, rotation)
/*
const group = new THREE.Group()

group.add(mesh) 

group.position.set(0.5,1,0.5)
group.scale.set(2,.5,.5)
group.rotation.x = Math.PI * 0.25
group.rotation.y = Math.PI * 0.25

scene.add(group)
*/

// Scene Graph or plain "grouping"
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

// Donut 1
const donut1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }) // yellow
)
donut1.position.x = -1.5
console.log(donut1.position.normalize())//Normalize the donut
group.add(donut1)

// Donut 2
const donut2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
)
donut2.position.x = 0
console.log(donut2.position.normalize()) //Normalize the donut
group.add(donut2)

// Donut 3
const donut3 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
)
donut3.position.x = 5
//console.log(donut3.position.normalize())//Normalize the donut
group.add(donut3)


// Axehelper use for showing axes y = green, x = red, z 
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// measure the length
console.log(mesh.position.length)


// Size sa shape og background 
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z, the angle of the camera, incr = zoom out,  decr = zoom in
camera.position.z = 5
//camera.lookAt(new THREE.Vector3(0, - 1, 0)) //ayw i sagol sa mesh.position, cuz invalid. 
camera.lookAt(mesh.position)
scene.add(camera)

//Measure distacne between mesh and camera
console.log(mesh.position.distanceTo(camera.position))


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Render
renderer.render(scene, camera)

