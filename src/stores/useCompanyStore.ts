// src/stores/useCompanyStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import companyData from '../data/company.json'
import aboutData from '../data/about.json'
import partnersData from '../data/partners.json'
import howItWorksData from '../data/howItWorks.json'


export const useCompanyStore = defineStore('company', () => {
  const company = ref(companyData)
  const about = ref(aboutData)
  const partners = ref(partnersData)
  const howItWorks = ref(howItWorksData)

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
