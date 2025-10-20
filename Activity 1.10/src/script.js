import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture loaders instances
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

// Texture loader
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg') 
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')

// Environment map
const environmentMapTexture = cubeTextureLoader.load([
 '/textures/environmentMaps/0/px.jpg',
 '/textures/environmentMaps/0/nx.jpg',
 '/textures/environmentMaps/0/py.jpg',
 '/textures/environmentMaps/0/ny.jpg',
 '/textures/environmentMaps/0/pz.jpg',
 '/textures/environmentMaps/0/nz.jpg'
])


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Objects
 */
const parameters = { color: 'yellow' }


// Materia (MeshBasicMaterial)
/*
const material = new THREE.MeshBasicMaterial() // basic material
material.map = doorColorTexture      // apply the color texture
material.color = new THREE.Color('#ff0000') // optional: tint
material.transparent = true          // optional: only if you want semi-transparent
material.opacity = 0.5               // optional: controls transparency
material.side = THREE.DoubleSide     // optional: render both sides

// material.flatShading = true
// material.matcap = matcapTexture
// material.alphaMap = doorAlphaTexture
*/


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



const material = new THREE.MeshStandardMaterial()


// Map Properties of the text loaders
material.map = doorColorTexture
material.displacementMap = doorHeightTexture
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.aoMap = doorAmbientOcclusionTexture
material.normalMap = doorNormalTexture
material.envMap = environmentMapTexture

material.normalScale.set(0.5, 0.5)

material.metalness = 0.7
material.roughness = 0.2

material.aoMapIntensity = 1
material.displacementScale = 0.05










const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)



sphere.geometry.setAttribute('uv2', new
THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new
THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new
THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))










// GUI Controls
const gui = new dat.GUI()

gui.add(sphere.position, 'y', -3, 3, 0.01).name('Sphere Elevation')
gui.add(plane.position, 'y', -3, 3, 0.01).name('Plane Elevation')
gui.add(torus.position, 'y', -3, 3, 0.01).name('Torus Elevation')

// 
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

gui.add(material, 'wireframe').name('Wireframe')
gui.addColor(parameters, 'color').name('Color').onChange(() => {
    material.color.set(parameters.color)
})

// Spin animations
const spin = {
    spin: () => {
        [sphere, plane, torus].forEach(mesh => {
            gsap.to(mesh.rotation, {
                duration: 1,
                y: mesh.rotation.y + Math.PI * 2
            })
        })
    }
}
gui.add(spin, 'spin').name('spin')


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Resize event
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


 //Animation
// Animation
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects to continue rotation
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // function call again and again
    window.requestAnimationFrame(tick)
}

tick()
