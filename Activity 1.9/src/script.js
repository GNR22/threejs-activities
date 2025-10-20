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




/**
 * Object
 */
/*
const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener('load', () =>
{
 texture.needsUpdate = true
})
image.src = '/textures/door/ambientOcclusion.jpg'
*/ 


// loading manadager method
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
 console.log('loading started')
}
loadingManager.onLoad = () =>
{
 console.log('loading finished')
}
loadingManager.onProgress = () =>
{
 console.log('loading progressing')
}
loadingManager.onError = () =>
{
 console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('textures/minecraft.png')


colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
// update wrapping 
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping

// offset 
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5

// rotation
colorTexture.rotation = Math.PI * 0.25
// Material
const material = new THREE.MeshBasicMaterial({ map: colorTexture })









//const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100)
// default color
const parameters = { color: 'yellow' }
// Material
//const material = new THREE.MeshBasicMaterial({ map: texture })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// Spin function 
const spin = {
    spin: () => {
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2
        })
    }
}

// GUI Controls
const gui = new dat.GUI()
gui.add(mesh.position, 'y', -3, 3, 0.01).name('Elevation')       // up and down 
gui.add(mesh, 'visible').name('Visible')                         // show donut
gui.add(material, 'wireframe').name('Wireframe')                 // lines 
gui.addColor(parameters, 'color').name('Color').onChange(() => { // change color
    material.color.set(parameters.color)
})
gui.add(spin, 'spin').name('Spin Donut')                         // Spin animation



/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
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
/**
 * Animate
 */
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