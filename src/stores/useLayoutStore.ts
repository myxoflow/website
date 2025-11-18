// src/stores/useLayoutStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { currentLang } from '../composables/useLang'
import type { NavigationItem } from '../types/index'

export const useLayoutStore = defineStore('layout', () => {
  const navigation = ref<NavigationItem[]>([])

  // Function to load language-specific navigation JSON
  async function loadNavigation() {
    const lang = currentLang.value
    try {
      const navImport = await import(`../data/${lang}/navigation.json`)
      navigation.value = navImport.default.navigation || []
    } catch (err) {
      // Fallback to English
      const navImport = await import('../data/en/navigation.json')
      navigation.value = navImport.default.navigation || []
    }
  }

  // Initial load
  loadNavigation()
  // Reactively watch language changes
  watch(currentLang, loadNavigation)

  return { navigation }
})
