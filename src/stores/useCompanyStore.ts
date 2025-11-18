// src/stores/useCompanyStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { currentLang } from '../composables/useLang'

export const useCompanyStore = defineStore('company', () => {
  const company = ref<any>({})
  const about = ref<any>({})
  const partners = ref<any>({})
  const howItWorks = ref<any>({})

  // Function to load language-specific JSON content
  async function loadData() {
    const lang = currentLang.value
    try {
      company.value = (await import(`../data/${lang}/company.json`)).default
      about.value = (await import(`../data/${lang}/about.json`)).default
      partners.value = (await import(`../data/${lang}/partners.json`)).default
      howItWorks.value = (await import(`../data/${lang}/howItWorks.json`)).default
    } catch (err) {
      // On error, fallback to English
      company.value = (await import('../data/en/company.json')).default
      about.value = (await import('../data/en/about.json')).default
      partners.value = (await import('../data/en/partners.json')).default
      howItWorks.value = (await import('../data/en/howItWorks.json')).default
    }
  }
  // Load data on store init
  loadData()
  // And whenever language changes
  watch(currentLang, loadData)

  // HOW IT WORKS PAGE
  const operationalModel = computed(() => howItWorks.value.howItWorks)

  // COMPANY PAGE
  const companyInfo = computed(() => company.value.company)
  const companyPhilosophy = computed(() => company.value.philosophy)
  const team = computed(() => company.value.team)

  // ABOUT PAGE
  const network = computed(() => about.value.network)
  const revenueModel = computed(() => about.value.revenueModel)
  const vision = computed(() => about.value.vision)

  // PARTNER PAGE
  const partnerOpportunities = computed(() => partners.value.partnerOpportunities)

  return {
    companyInfo,
    companyPhilosophy,
    team,
    network,
    revenueModel,
    vision,
    partnerOpportunities,
    operationalModel
  }
})
