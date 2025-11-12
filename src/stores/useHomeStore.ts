// stores/useHomeStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import homeData from '../data/home.json'
import companyData from '../data/company.json'
import aboutData from '../data/about.json'
import partnersData from '../data/partners.json'

import productsData from '../data/products/products.json'
import type { Product } from '../types/index'

export const useHomeStore = defineStore('home', () => {
  // State
  const home = ref(homeData)
  const company = ref(companyData)
  const about = ref(aboutData)
  const partners = ref(partnersData)
  const products = ref<Product[]>(productsData.products)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- HOMEPAGE ---
  const heroSection = computed(() => home.value.hero)
  const philosophy = computed(() => home.value.philosophy)
  const operationalModel = computed(() => home.value.operationalModel)
  const homePageCTA = computed(() => home.value.finalCTA)

  // --- COMPANY PAGE ---
  const companyInfo = computed(() => company.value.company)
  const companyPhilosophy = computed(() => company.value.philosophy)
  const team = computed(() => company.value.team)

  // --- ABOUT PAGE ---
  const network = computed(() => about.value.network)
  const revenueModel = computed(() => about.value.revenueModel)
  const vision = computed(() => about.value.vision)

  // --- PARTNERS PAGE ---
  const partnerOpportunities = computed(() => partners.value.partnerOpportunities)
  const idealPartner = computed(() => partners.value.partnerOpportunities.ideal)
  const partnerCTA = computed(() => partners.value.partnerOpportunities)

  // --- PRODUCTS ---
  const featuredProducts = computed(() => products.value.filter(p => p.featured))
  const allProducts = computed(() => products.value)
  const productsByTag = computed(() => (tag: string) =>
    products.value.filter(p => p.tags.includes(tag))
  )

  // --- Actions ---
  const scrollToSection = (sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' })
    }
  }

  const getProductByKey = (key: string): Product | undefined =>
    products.value.find(p => p.key === key)

  const getFeaturedProductsCount = (): number =>
    products.value.filter(p => p.featured).length

  const getProductsByGeography = (geography: string): Product[] =>
    products.value.filter(p =>
      p.geography?.toLowerCase().includes(geography.toLowerCase())
    )

  return {
    // State
    home,
    company,
    about,
    partners,
    products,
    isLoading,
    error,

    // Home
    heroSection,
    philosophy,
    operationalModel,
    homePageCTA,

    // Company
    companyInfo,
    companyPhilosophy,
    team,

    // About
    network,
    revenueModel,
    vision,

    // Partners
    partnerOpportunities,
    idealPartner,
    partnerCTA,

    // Products
    featuredProducts,
    allProducts,
    productsByTag,

    // Actions
    scrollToSection,
    getProductByKey,
    getFeaturedProductsCount,
    getProductsByGeography
  }
})
