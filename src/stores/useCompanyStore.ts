// src/stores/useCompanyStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { currentLang } from '../composables/useLang'

export const useCompanyStore = defineStore('company', () => {
  const company = ref<any>({})
  const about = ref<any>({})
  const partners = ref<any>({})
  const howItWorks = ref<any>({})

  const emptyCompanyInfo = {
    name: '',
    tagline: '',
    description: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    social: [],
  }
  const emptyPhilosophy = {
    title: '',
    subtitle: '',
    principles: [],
  }
  const emptyTeam = {
    title: '',
    subtitle: '',
    members: [],
  }
  const emptyNetwork = {
    title: '',
    deployment: { title: '', scope: '', description: '' },
    supply: { title: '', scope: '', description: '' },
  }
  const emptyRevenueModel = {
    title: '',
    streams: [],
  }
  const emptyVision = {
    title: '',
    goals: [],
  }
  const emptyPartnerOpportunities = {
    title: '',
    subtitle: '',
    benefits: [],
    ideal: '',
  }
  const emptyOperationalModel = {
    title: '',
    subtitle: '',
    overview: '',
    steps: [],
    cta: null,
  }

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
 watch(currentLang, () => {
  console.log('Language changed, reloading...')
  loadData()
}, { flush: 'post' })  // Defer the watch until after renders

  // HOW IT WORKS PAGE
  const operationalModel = computed(() => howItWorks.value.howItWorks || emptyOperationalModel)

  // COMPANY PAGE
  const companyInfo = computed(() => company.value.company || emptyCompanyInfo)
  const companyPhilosophy = computed(() => company.value.philosophy || emptyPhilosophy)
  const team = computed(() => company.value.team || emptyTeam)

  // ABOUT PAGE
  const network = computed(() => about.value.network || emptyNetwork)
  const revenueModel = computed(() => about.value.revenueModel || emptyRevenueModel)
  const vision = computed(() => about.value.vision || emptyVision)

  // PARTNER PAGE
  const partnerOpportunities = computed(() => partners.value.partnerOpportunities || emptyPartnerOpportunities)

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
