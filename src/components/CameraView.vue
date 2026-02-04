<template>
  <div v-if="isOpen" class="camera-container">
    <video ref="videoRef" autoplay playsinline class="camera-video"></video>

    <!-- Top bar -->
    <button class="close-btn" @click="closeCamera">✕</button>

    <!-- Bottom bar -->
    <div class="controls">
      <button class="capture-btn" @click="capturePhoto"></button>
    </div>
  </div>

  <!-- Preview -->
  <div v-if="photo" class="preview-container">
    <img :src="photo" class="preview-img" />

    <div class="preview-actions">
      <button @click="retake">Retake</button>
      <button @click="confirm">Confirm</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const isOpen = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)
const photo = ref<string | null>(null)

const openCamera = async () => {
  isOpen.value = true

  stream.value = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: 'environment' },
    },
    audio: false,
  })

  if (videoRef.value) {
    videoRef.value.srcObject = stream.value
  }
}

const closeCamera = () => {
  stopStream()
  isOpen.value = false
}

const stopStream = () => {
  stream.value?.getTracks().forEach(track => track.stop())
  stream.value = null
}

const capturePhoto = () => {
  if (!videoRef.value) return

  const canvas = document.createElement('canvas')
  canvas.width = videoRef.value.videoWidth
  canvas.height = videoRef.value.videoHeight

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(videoRef.value, 0, 0)

  photo.value = canvas.toDataURL('image/jpeg', 0.9)

  closeCamera()
}

const retake = () => {
  photo.value = null
  openCamera()
}

const confirm = () => {
  console.log('Captured image:', photo.value)
}

onUnmounted(() => stopStream())

defineExpose({ openCamera })
</script>

<style scoped>
.camera-container {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 9999;
}

.camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* Close button */
.close-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(0,0,0,0.6);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

/* Capture button */
.controls {
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.capture-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
}

/* Preview */
.preview-container {
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  flex-direction: column;
}

.preview-img {
  flex: 1;
  object-fit: contain;
}

.preview-actions {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}
</style>
