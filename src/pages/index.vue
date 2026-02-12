<script setup lang="ts">
import { ref } from 'vue'
import CameraView from '../components/CameraView.vue'
import { usePWAInstall } from '@/composables/usePWAInstall'
const { canInstall, installApp } = usePWAInstall()

const cameraRef = ref<InstanceType<typeof CameraView> | null>(null)

const openCamera = () => {
  cameraRef.value?.openCamera()
}
</script>

<template>
  <p>Homepage</p>
  <button @click="openCamera">Open Camera</button>
  {{ canInstall }}
   <button
    v-if="canInstall"
    @click="installApp"
    class="install-btn"
  >
    Install App
  </button>

  <CameraView ref="cameraRef" />
</template>

<style>
.install-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  background: black;
  color: white;
  border: none;
  font-size: 16px;
}
</style>
