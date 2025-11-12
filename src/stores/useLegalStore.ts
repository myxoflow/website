import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import legalData from '../data/legal.json'

export const useLegalStore = defineStore('legal', () => {
  const content = ref(legalData)

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
