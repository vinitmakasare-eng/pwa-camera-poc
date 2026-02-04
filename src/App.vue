<template>
  <button @click="openCamera">Open Camera</button>

  <CameraView ref="cameraRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CameraView from './components/CameraView.vue'

const cameraRef = ref<InstanceType<typeof CameraView> | null>(null)

const openCamera = () => {
  cameraRef.value?.openCamera()
}
</script>
