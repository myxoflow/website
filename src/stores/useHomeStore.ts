// stores/useHomeStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { currentLang } from '../composables/useLang' // new composable
import type { Product } from '../types/index'

export const useHomeStore = defineStore('home', () => {
  // State (initialized as empty, loads async)
  const home = ref<any>({})
  const company = ref<any>({})
  const about = ref<any>({})
  const partners = ref<any>({})
  const products = ref<Product[]>([])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  //--- DATA LOADING ---//
  async function loadData() {
    isLoading.value = true
    error.value = null
    const lang = currentLang.value
    try {
      // Main content
      home.value = (await import(`../data/${lang}/home.json`)).default
      company.value = (await import(`../data/${lang}/company.json`)).default
      about.value = (await import(`../data/${lang}/about.json`)).default
      partners.value = (await import(`../data/${lang}/partners.json`)).default
      // Products (for deeper folders)
      const productsJson = (await import(`../data/${lang}/products/products.json`)).default
      products.value = productsJson.products || []
    } catch (err) {
      console.error('Load failed, falling back to English:', err)
      error.value = "Could not load content for selected language. Falling back to English."
      // Fallback to English
      try {
        home.value = (await import('../data/en/home.json')).default
        company.value = (await import('../data/en/company.json')).default
        about.value = (await import('../data/en/about.json')).default
        partners.value = (await import('../data/en/partners.json')).default
        const productsJson = (await import('../data/en/products/products.json')).default
        products.value = productsJson.products || []
      } catch (fallbackErr) {
        error.value = "Could not load any content."
      }
    }
    isLoading.value = false
  }
  // Load data on init, and whenever language changes
  loadData()
  watch(currentLang, loadData)

  //--- HOMEPAGE ---//
  const heroSection = computed(() => home.value.hero)
  const philosophy = computed(() => home.value.philosophy)
  const operationalModel = computed(() => home.value.operationalModel)
  const homePageCTA = computed(() => home.value.finalCTA)

  //--- COMPANY PAGE ---//
  const companyInfo = computed(() => company.value.company)
  const companyPhilosophy = computed(() => company.value.philosophy)
  const team = computed(() => company.value.team)

  //--- ABOUT PAGE ---//
  const network = computed(() => about.value.network)
  const revenueModel = computed(() => about.value.revenueModel)
  const vision = computed(() => about.value.vision)

  //--- PARTNERS PAGE ---//
  const partnerOpportunities = computed(() => partners.value.partnerOpportunities)
  const idealPartner = computed(() => partners.value.partnerOpportunities?.ideal)
  const partnerCTA = computed(() => partners.value.partnerOpportunities)

  //--- PRODUCTS ---//
  const featuredProducts = computed(() => products.value.filter(p => p.featured))
  const allProducts = computed(() => products.value)
  const productsByTag = computed(() => (tag: string) =>
    products.value.filter(p => p.tags?.includes(tag))
  )

  //--- Actions ---//
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
    home, company, about, partners, products, isLoading, error,

    // Home
    heroSection, philosophy, operationalModel, homePageCTA,

    // Company
    companyInfo, companyPhilosophy, team,

    // About
    network, revenueModel, vision,

    // Partners
    partnerOpportunities, idealPartner, partnerCTA,

    // Products
    featuredProducts, allProducts, productsByTag,

    // Actions
    scrollToSection, getProductByKey, getFeaturedProductsCount, getProductsByGeography,
    loadData // (optional: if you ever want to reload manually in a component)
  }
})
