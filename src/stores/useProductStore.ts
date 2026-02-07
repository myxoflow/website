// stores/ProductStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { currentLang } from '../composables/useLang'
import type { Product, ProductDetails } from '../types/index'

export const useProductStore = defineStore('product', () => {
  // State
  const products: Ref<Product[]> = ref([])
  const currentProduct: Ref<Product | null> = ref(null)
  const currentDetails = ref<ProductDetails | null>(null)
  const isLoading: Ref<boolean> = ref(false)
  const error = ref<string | null>(null)

  // Load the products list from the right language file
  async function loadProducts() {
    const lang = currentLang.value

    // Use Vite's import.meta.glob so the bundler includes the JSON files
    const productsGlobs: Record<string, () => Promise<any>> = import.meta.glob(
      '../data/*/products/products.json'
    )

    const targetKey = `../data/${lang}/products/products.json`
    const fallbackKey = '../data/en/products/products.json'

    const loader = productsGlobs[targetKey] || productsGlobs[fallbackKey]
    if (!loader) {
      products.value = []
      error.value = 'Failed to find products JSON files in build'
      return
    }

    try {
      const module = await loader()
      // JSON files may export as default or directly as object
      products.value = module?.default?.products || module?.products || []
    } catch (err) {
      products.value = []
      error.value = 'Failed to load products JSON'
    }
  }
  // Initial load and reactive reload
  loadProducts()
  watch(currentLang, () => {
  console.log('Language changed, reloading...')
  loadProducts()
}, { flush: 'post' })  // Defer the watch until after renders

  // Computed
  const allProducts = computed(() => products.value)
  const featuredProducts = computed(() => products.value.filter(p => p.featured))

  // Actions
  const getProductByKey = (key: string): Product | undefined => {
    const product = products.value.find(p => p.key === key)
    if (product) {
      currentProduct.value = product
    }
    return product
  }

  const loadProductDetails = async (key: string): Promise<ProductDetails | null> => {
    isLoading.value = true
    error.value = null
    const lang = currentLang.value
    // Use import.meta.glob to include all product detail JSON files
    const detailGlobs: Record<string, () => Promise<any>> = import.meta.glob(
      '../data/*/products/*.json'
    )

    const targetKey = `../data/${lang}/products/${key}.json`
    const fallbackKey = `../data/en/products/${key}.json`

    const loader = detailGlobs[targetKey] || detailGlobs[fallbackKey]
    if (!loader) {
      error.value = `No detail JSON found for ${key}`
      currentDetails.value = null
      isLoading.value = false
      return null
    }

    try {
      const module = await loader()
      currentDetails.value = (module?.default || module) as ProductDetails
      return currentDetails.value
    } catch (err) {
      error.value = `Failed to load detailed information for ${key}`
      currentDetails.value = null
      return null
    } finally {
      isLoading.value = false
    }
  }

  const getRelatedProducts = (currentKey: string, limit = 3): Product[] => {
    const current = products.value.find(p => p.key === currentKey)
    if (!current) return []
    return products.value
      .filter(p => p.key !== currentKey)
      .map(p => ({
        product: p,
        score: p.tags?.filter(tag => current.tags?.includes(tag)).length || 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product)
  }

  const setCurrentProduct = (product: Product | null): void => {
    currentProduct.value = product
  }

  const getProductsByTag = (tag: string): Product[] => {
    return products.value.filter(p => p.tags?.includes(tag))
  }

  const clearCurrentProduct = () => {
    currentProduct.value = null
  }

  return {
    // State
    products,
    currentProduct,
    currentDetails,
    isLoading,
    error,

    // Computed
    allProducts,
    featuredProducts,

    // Actions
    getProductByKey,
    loadProductDetails,
    getRelatedProducts,
    setCurrentProduct,
    getProductsByTag,
    clearCurrentProduct
  }
})
