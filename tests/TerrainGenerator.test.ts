import { mount } from '@vue/test-utils'
import TerrainGenerator from '../src/TerrainGenerator.vue'
import { describe, it, expect } from 'vitest'

describe('TerrainGenerator.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(TerrainGenerator, {
      props: {
        terrainSize: 1000,
        segments: 512,
        heightScaling: 80,
        terrainColor: '#88cc88',
        backgroundColor: '#000000',
        noiseType: 'simplex',
        texturePaths: {},
        noiseScale: 0.02,
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('has a download button', () => {
    const wrapper = mount(TerrainGenerator, {
      props: {
        terrainSize: 1000,
        segments: 512,
        heightScaling: 80,
        terrainColor: '#88cc88',
        backgroundColor: '#000000',
        noiseType: 'simplex',
        texturePaths: {},
        noiseScale: 0.02,
      }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })
})
