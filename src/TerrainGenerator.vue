<template>
  <div>
    <button @click="downloadTerrain">Generate & Download Terrain</button>
    <div ref="threeContainer" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted, reactive, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import SimplexNoise from 'simplex-noise'

export default defineComponent({
  name: 'TerrainGenerator',
  props: {
    terrainSize: { type: Number, default: 1000 },
    segments: { type: Number, default: 512 },
    heightScaling: { type: Number, default: 80 },
    terrainColor: { type: String, default: '#88cc88' },
    backgroundColor: { type: String, default: '#000000' },
    noiseType: { type: String, default: 'simplex' },
    noiseScale: { type: Number, default: 0.02 },
    enableAnimation: { type: Boolean, default: false },
    animationSpeed: { type: Number, default: 0.005 },
  },
  setup(props, { expose }) {
    const threeContainer = ref(null)
    let scene, camera, renderer, terrain, animationId
    let noiseGenerator = new SimplexNoise()
    let clock = new THREE.Clock()
    const downloadTerrain = () => {
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
    // Using reactive state instead of directly modifying props
    const state = reactive({
      terrainSize: props.terrainSize,
      segments: props.segments,
      heightScaling: props.heightScaling,
      terrainColor: props.terrainColor,
      backgroundColor: props.backgroundColor,
      noiseType: props.noiseType,
      noiseScale: props.noiseScale,
      enableAnimation: props.enableAnimation,
      animationSpeed: props.animationSpeed
    })
    
    const generateTerrain = (geometry) => {
      const vertices = geometry.attributes.position.array
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] * state.noiseScale
        const z = vertices[i + 2] * state.noiseScale
        const noiseValue = noiseGenerator.noise2D(x, z)
        vertices[i + 1] = noiseValue * state.heightScaling
      }
      geometry.computeVertexNormals()
    }

    const initScene = () => {
      if (!threeContainer.value) return;

      scene = new THREE.Scene()
      scene.background = new THREE.Color(state.backgroundColor)
      
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 100, 200)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      threeContainer.value.appendChild(renderer.domElement)

      const geometry = new THREE.PlaneGeometry(state.terrainSize, state.terrainSize, state.segments, state.segments)
      geometry.rotateX(-Math.PI / 2)
      
      generateTerrain(geometry)
      
      const material = new THREE.MeshStandardMaterial({ color: state.terrainColor })
      terrain = new THREE.Mesh(geometry, material)
      scene.add(terrain)

      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(500, 500, 500).normalize()
      scene.add(light)

      animate()
    }

    const animate = () => {
      if (state.enableAnimation) {
        const elapsedTime = clock.getElapsedTime()
        terrain.rotation.y += state.animationSpeed

        const vertices = terrain.geometry.attributes.position.array
        for (let i = 0; i < vertices.length; i += 3) {
          vertices[i + 1] = Math.sin(elapsedTime + vertices[i] * 0.01 + vertices[i + 2] * 0.01) * 2
        }
        terrain.geometry.attributes.position.needsUpdate = true
      }
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    const updateSettings = async (newProps) => {
      // Update the reactive state instead of props
      Object.assign(state, newProps)
      scene.clear()
      await nextTick()
      initScene()
    }

    onMounted(async () => {
      await nextTick()  // Ensures the DOM is updated before accessing it
      initScene()
    })

  

    onUnmounted(() => {
      cancelAnimationFrame(animationId)
      renderer.dispose()
    })

    expose({ updateSettings })
    
    return { threeContainer, downloadTerrain }
  }
})

</script>
