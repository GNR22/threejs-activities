import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug GUI
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/* This block introduces a Loading Manager, whose purpose is to monitor and handle 
the process of loading assets (textures, models, fonts, etc.) in Three.js.*/
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}
loadingManager.onProgress = () => {
    console.log('loading progressing')
}
loadingManager.onError = () => {
    console.log('loading error')
}


/**
* Textures
*/
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('blue', 0.5)
scene.add(ambientLight)


// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, -1)
directionalLight.castShadow = true
scene.add(directionalLight)


// Directional light shadow setup
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.radius = 4

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false



// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)

spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)

scene.add(spotLightCameraHelper)
spotLightCameraHelper.visible = false


// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3)

pointLight.castShadow = true
pointLight.position.set(- 1, 1, 0)
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)

scene.add(pointLightCameraHelper)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

/**
 * Objects
 */


const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)

/*
const plane = new THREE.Mesh(
 new THREE.PlaneGeometry(5, 5),
 new THREE.MeshBasicMaterial({
 map: bakedShadow
 })
)
*/
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
plane.receiveShadow = true


const torusShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow
  })
)
torusShadow.rotation.x = -Math.PI * 0.5
torusShadow.position.y = plane.position.y + 0.01


const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 32, 64),
  material
)
torus.castShadow = true
scene.add(torus, torusShadow, plane)

// GUI 
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Intensity')
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('DirLight Intensity')
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.01).name('DirLight X')
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.01).name('DirLight Y')
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.01).name('DirLight Z')
gui.add(directionalLightCameraHelper, 'visible').name('Show Dir Helper')
gui.add(spotLightCameraHelper, 'visible').name('Show Spot Helper')
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
spotLight.castShadow = true
pointLight.castShadow = true
renderer.shadowMap.enabled = true

/**
 * Resize handler
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
     // bouncing
    torus.position.x = Math.cos(elapsedTime) * 1.5
    torus.position.z = Math.sin(elapsedTime) * 1.5
    torus.position.y = Math.abs(Math.sin(elapsedTime * 3)) + 0.25 // offset so it sits above the plane

    // Update fake shadow
    torusShadow.position.x = torus.position.x
    torusShadow.position.z = torus.position.z
    torusShadow.material.opacity = (1 - torus.position.y) * 0.3

    // updates render
    controls.update()
    renderer.render(scene, camera)

    requestAnimationFrame(tick)
}

tick()
