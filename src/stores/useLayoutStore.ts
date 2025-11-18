// src/stores/useLayoutStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { currentLang } from '../composables/useLang'
import type { NavigationItem } from '../types/index'

export const useLayoutStore = defineStore('layout', () => {
  const navigation = ref<NavigationItem[]>([])
  const footerLinks = ref<Record<string, any>>({})

  // Function to load language-specific navigation JSON
  async function loadNavigation() {
    const lang = currentLang.value
    try {
      const navImport = await import(`../data/${lang}/navigation.json`)
      navigation.value = navImport.default.navigation || []
      footerLinks.value = navImport.default.footer || {}
    } catch (err) {
      // Fallback to English
      const navImport = await import('../data/en/navigation.json')
      navigation.value = navImport.default.navigation || []
      footerLinks.value = navImport.default.footer || {}
    }
  }

  // Initial load
  loadNavigation()
  // Reactively watch language changes
  watch(currentLang, loadNavigation)

  return { navigation, footerLinks }
})
