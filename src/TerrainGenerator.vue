<template>
  <div>
    <button @click="downloadTerrain">Generate & Download Terrain</button>
    <div ref="threeContainer" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import SimplexNoise from 'simplex-noise'

// Define Prop Types
interface TexturePaths {
  albedo?: string | null
  normal?: string | null
  roughness?: string | null
}

interface Props {
  terrainSize: number
  segments: number
  heightScaling: number
  terrainColor: string
  backgroundColor: string
  noiseType: 'simplex' | 'perlin'
  texturePaths: TexturePaths
  noiseScale: number
}

// Props
const props = defineProps<Props>()

// Refs
const threeContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer
let terrain: THREE.Mesh, animationId: number
const textureCache = new Map<string, THREE.Texture>()

const noiseGenerator = new SimplexNoise()

// Generate terrain using noise
function generateTerrain(geometry: THREE.PlaneGeometry) {
  const vertices = geometry.attributes.position.array as Float32Array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i] * props.noiseScale
    const z = vertices[i + 2] * props.noiseScale
    const noiseValue = noiseGenerator.noise2D(x, z)
    vertices[i + 1] = noiseValue * props.heightScaling
  }
  geometry.computeVertexNormals()
}

// Create material with optional textures
function createMaterial(): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({ color: props.terrainColor })

  Object.entries(props.texturePaths).forEach(([key, path]) => {
    if (path && !textureCache.has(path)) {
      const loader = new THREE.TextureLoader()
      const texture = loader.load(path)
      textureCache.set(path, texture)
    }

    if (textureCache.has(path!)) {
      if (key === 'albedo') material.map = textureCache.get(path!)
      if (key === 'normal') material.normalMap = textureCache.get(path!)
      if (key === 'roughness') material.roughnessMap = textureCache.get(path!)
    }
  })

  return material
}

// Export the scene as .gltf
function downloadTerrain() {
  const exporter = new GLTFExporter()
  exporter.parse(scene, (gltf) => {
    const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'random_terrain.gltf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
}

// Initialize Three.js Scene
onMounted(() => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(props.backgroundColor)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 100, 200)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeContainer.value?.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(props.terrainSize, props.terrainSize, props.segments, props.segments)
  geometry.rotateX(-Math.PI / 2)
  generateTerrain(geometry)

  const material = createMaterial()
  terrain = new THREE.Mesh(geometry, material)
  scene.add(terrain)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(500, 500, 500).normalize()
  scene.add(light)

  function animate() {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})

// Cleanup
onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  textureCache.clear()
})
</script>
