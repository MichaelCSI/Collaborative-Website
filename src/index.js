import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
  
import './index.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas - see html canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdc143c);

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3)
// Creating our own BufferGeometry using Float32Array ~ native js, only for floats
const geometry = new THREE.BufferGeometry()
const count = 150
// Initializing vertices: 3 triangles with 3 points
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++){
    //-0.5 to center it ~ -0.5 to 0.5 instead of 0 to 1
    positionsArray[i] = Math.random() - 0.5
}

//Converting to a BufferAttribute, pass 3: 3 values per vertex(x, y, z...)
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
//Note: not covered here but index allows indices to be reused in overlap


const material = new THREE.MeshBasicMaterial({ 
    color: 0xdda0dd,
    //Outline of shape
    wireframe: true
})
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
camera.position.z = -0.01
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


// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update wireframe mesh which appears as cool design
    mesh.position.y = Math.sin(elapsedTime * 0.1) * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render();