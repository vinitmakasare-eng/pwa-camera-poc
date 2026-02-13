import { ref, onMounted } from 'vue'

export function usePWAInstall() {
  const deferredPrompt = ref<any>(null)
  const canInstall = ref(false)

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      // e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
      console.log('PWA install available')
    })

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed')
      canInstall.value = false
      deferredPrompt.value = null
    })
  })

  const installApp = async () => {
    if (!deferredPrompt.value) return

    deferredPrompt.value.prompt()

    const { outcome } = await deferredPrompt.value.userChoice
    console.log('User response:', outcome)

    deferredPrompt.value = null
    canInstall.value = false
  }

  return {
    canInstall,
    installApp,
  }
}
