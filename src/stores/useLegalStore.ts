// src/stores/useLegalStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { currentLang } from '../composables/useLang'

export const useLegalStore = defineStore('legal', () => {
  const content = ref<any>({})

  // Load legal.json based on current language
  async function loadLegal() {
    const lang = currentLang.value
    try {
      const imported = await import(`../data/${lang}/legal.json`)
      content.value = imported.default
    } catch (err) {
      // Fallback to English
      const fallback = await import('../data/en/legal.json')
      content.value = fallback.default
    }
  }

  // Initial load and watch for lang changes
  loadLegal()
  watch(currentLang, loadLegal)

  const privacyPolicy = computed(() => content.value.privacyPolicy)
  const cookiesPolicy = computed(() => content.value.cookies)
  const terms = computed(() => content.value.terms)
  const disclaimer = computed(() => content.value.disclaimer)
  const dpa = computed(() => content.value.dpa)

  // For generating links to all available legal pages dynamically
  const legalLinks = computed(() => [
    { name: 'Privacy Policy', route: 'privacy' },
    { name: 'Cookies Policy', route: 'cookies' },
    { name: 'Terms & Conditions', route: 'terms' },
    { name: 'Disclaimer', route: 'disclaimer' },
    { name: 'Data Processing Agreement (DPA)', route: 'dpa' }
  ])

  return {
    content,
    privacyPolicy,
    cookiesPolicy,
    terms,
    disclaimer,
    dpa,
    legalLinks
  }
})
