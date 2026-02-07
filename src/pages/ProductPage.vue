<template>
  <div class="product-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <q-spinner color="primary" size="64px" />
      <p class="loading-text">Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !product" class="error-container">
      <div class="error-content">
        <q-icon name="error_outline" size="80px" color="negative" />
        <h2>Product Not Found</h2>
        <p>{{ error || 'The product you are looking for does not exist.' }}</p>
        <q-btn
          label="Back to Home"
          color="primary"
          size="lg"
          unelevated
          rounded
          @click="navigateHome"
        />
      </div>
    </div>

    <!-- Product Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="product-hero">
        <div class="container">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
            <q-icon name="chevron_right" size="16px" class="breadcrumb-separator" />
            <router-link to="/products" class="breadcrumb-link">Products</router-link>
            <q-icon name="chevron_right" size="16px" class="breadcrumb-separator" />
            <span class="breadcrumb-current">{{ product.name }}</span>
          </div>

          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">{{ details?.title || product.name }}</h1>
              <p class="hero-tagline">{{ details?.tagline || product.tagline }}</p>

              <div v-if="product.geography" class="geography-badge">
                <q-icon name="public" size="20px" />
                <span>{{ product.geography }}</span>
              </div>

              <div class="hero-actions">
                <q-btn
                  :label="product.pricing.tiers[0]?.cta"
                  color="primary"
                  size="lg"
                  unelevated
                  rounded
                  @click="scrollToSection('pricing')"
                />
                <q-btn
                  label="Learn More"
                  color="primary"
                  size="lg"
                  outline
                  rounded
                  @click="scrollToSection('solution')"
                />
              </div>
            </div>

            <div class="hero-visual">
              <div class="product-icon">
                <q-icon name="apps" size="120px" color="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Background Section -->
      <section v-if="details?.background" id="background" class="background-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.background.headline }}</h2>
          </div>
          <div class="background-content">
            <p class="summary-text">{{ details.background.summary }}</p>
            <div class="insight-box">
              <q-icon name="lightbulb" size="32px" color="amber" />
              <p>{{ details.background.insight }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Problem Section -->
      <section v-if="details?.problem" id="problem" class="problem-section">
        <div class="container">
          <div class="section-header">
            <h2>Structural Challenges</h2>
            <p>The broken ecosystem we're fixing</p>
          </div>
          <div class="challenges-grid">
            <div
              v-for="(challenge, index) in details.problem.structuralChallenges"
              :key="index"
              class="challenge-card"
            >
              <div class="challenge-icon">
                <q-icon name="close" size="24px" color="negative" />
              </div>
              <p>{{ challenge }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Market Opportunity Section -->
      <section v-if="details?.marketOpportunity" id="market" class="market-section">
        <div class="container">
          <div class="section-header">
            <h2>Market Opportunity</h2>
          </div>
          <div class="market-content">
            <p class="insight-text">{{ details.marketOpportunity.insight }}</p>
            <div class="data-points">
              <div
                v-for="(point, index) in details.marketOpportunity.dataPoints"
                :key="index"
                class="data-point"
              >
                <q-icon name="trending_up" size="24px" color="positive" />
                <span>{{ point }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Solution Section -->
      <section v-if="details?.solution" id="solution" class="solution-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.solution.headline }}</h2>
            <p>{{ details.solution.description }}</p>
          </div>
          <div class="features-grid">
            <div
              v-for="feature in details.solution.coreFeatures"
              :key="feature.title"
              class="feature-card"
            >
              <div class="feature-icon">
                <q-icon name="check_circle" size="32px" color="primary" />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparative Analysis Section -->
      <section v-if="details?.comparative" id="comparison" class="comparative-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.comparative.title }}</h2>
          </div>
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-cell aspect">Aspect</div>
              <div class="header-cell traditional">Traditional Model</div>
              <div class="header-cell myxofill">MyxoFill</div>
            </div>
            <div
              v-for="item in details.comparative.items"
              :key="item.aspect"
              class="table-row"
            >
              <div class="table-cell aspect">
                <strong>{{ item.aspect }}</strong>
              </div>
              <div class="table-cell traditional">
                <q-icon name="close" size="20px" color="negative" />
                <span>{{ item.traditional }}</span>
              </div>
              <div class="table-cell myxofill">
                <q-icon name="check" size="20px" color="positive" />
                <span>{{ item.myxofill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vision Section -->
      <section v-if="details?.vision" id="vision" class="vision-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.vision.title }}</h2>
          </div>
          <div class="principles-grid">
            <div
              v-for="principle in details.vision.principles"
              :key="principle.title"
              class="principle-card"
            >
              <h3>{{ principle.title }}</h3>
              <p>{{ principle.description }}</p>
            </div>
          </div>
          <div class="vision-summary">
            <p>{{ details.vision.summary }}</p>
          </div>
        </div>
      </section>

      <!-- Metrics Section -->
      <section v-if="details?.metrics" id="metrics" class="metrics-section">
        <div class="container">
          <div class="section-header">
            <h2>Expected Impact</h2>
          </div>
          <div class="metrics-grid">
            <div
              v-for="(impact, index) in details.metrics.expectedImpact"
              :key="index"
              class="metric-card"
            >
              <q-icon name="insights" size="40px" color="primary" />
              <p>{{ impact }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Now Section -->
      <section v-if="details?.whyNow" id="timing" class="timing-section">
        <div class="container">
          <div class="section-header">
            <h2>Why Now?</h2>
            <p>Market timing and trends favor this solution</p>
          </div>
          <div class="timing-grid">
            <div v-for="(reason, index) in details.whyNow" :key="index" class="timing-card">
              <q-icon name="schedule" size="32px" color="primary" />
              <p>{{ reason }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="pricing-section">
        <div class="container">
          <div class="section-header">
            <h2>Pricing</h2>
            <p class="pricing-model">{{ product.pricing.model }}</p>
          </div>

          <div class="pricing-grid">
            <div
              v-for="tier in product.pricing.tiers"
              :key="tier.name"
              class="pricing-card"
              :class="{ popular: tier.popular }"
            >
              <div v-if="tier.popular" class="popular-badge">Most Popular</div>

              <h3>{{ tier.name }}</h3>
              <p class="tier-description">{{ tier.description }}</p>

              <div class="price-display">
                <span class="price">{{ tier.price }}</span>
                <span class="period">{{ tier.billingPeriod }}</span>
              </div>

              <div class="tier-features">
                <h4>Includes:</h4>
                <ul>
                  <li v-for="feature in tier.features" :key="feature">
                    <q-icon name="check" size="18px" color="positive" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <q-btn
                :label="tier.cta"
                :color="tier.popular ? 'primary' : 'secondary'"
                size="lg"
                unelevated
                rounded
                class="tier-cta"
                @click="handleCTA(tier.name)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products Section -->
      <section v-if="relatedProducts.length > 0" class="related-section">
        <div class="container">
          <div class="section-header">
            <h2>Related Products</h2>
            <p>You might also be interested in</p>
          </div>

          <div class="related-grid">
            <div
              v-for="related in relatedProducts"
              :key="related.key"
              class="related-card"
              @click="navigateToProduct(related.key)"
            >
              <h3>{{ related.name }}</h3>
              <p class="related-tagline">{{ related.tagline }}</p>
              <p class="related-description">{{ related.description }}</p>

              <div class="related-footer">
                <span class="related-price">{{ related.pricing.tiers[0]?.price }}</span>
                <q-icon name="arrow_forward" size="24px" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="product-cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join the transparent, merit-based marketplace</p>

            <div class="cta-actions">
              <q-btn
                :label="product.pricing.tiers[0]?.cta"
                color="white"
                text-color="primary"
                size="xl"
                unelevated
                rounded
                @click="scrollToSection('pricing')"
              />
              <q-btn
                label="Contact Sales"
                color="transparent"
                text-color="white"
                size="xl"
                outline
                rounded
                @click="navigateToContact"
              />
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/useProductStore'
import { updatePageTitle, updateMetaDescription } from '../utils'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Computed
const productKey = computed(() => route.params.key as string)
const product = computed(() => productStore.currentProduct)
const details = computed(() => productStore.currentDetails)
const isLoading = computed(() => productStore.isLoading)
const error = computed(() => productStore.error)
const relatedProducts = computed(() =>
  product.value ? productStore.getRelatedProducts(product.value.key) : []
)

// Load product data
const loadProduct = async (): Promise<void> => {
  const key = productKey.value
  if (!key) return

  // Load basic product info
  const foundProduct = productStore.getProductByKey(key)
  if (!foundProduct) {
    return
  }

  // Load detailed product info
  await productStore.loadProductDetails(key)

  // Update meta tags
  updatePageTitle(foundProduct.name)
  updateMetaDescription(foundProduct.description)
}

// Watch for route changes
watch(
  () => route.params.key,
  async() => {
    await loadProduct()
    window.scrollTo(0, 0)
  }
)

onMounted(async () => {
  await loadProduct()
})

// Methods
const scrollToSection = (sectionId: string, offset = 80): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

const navigateToProduct = async (key: string): Promise<void> => {
  await router.push({ name: 'product', params: { key } })
}

const navigateToContact = async (): Promise<void> => {
  await router.push({ name: 'contact' })
}

const navigateHome = async (): Promise<void> => {
  await router.push({ name: 'home' })
}

const handleCTA = async (tierName: string): Promise<void> => {
  console.log(`CTA clicked for tier: ${tierName}`)
  await navigateToContact()
}
</script>

<style scoped lang="scss">
.product-page {
  color: #e2e8f0;
}

.loading-container,
.error-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.product-hero {
  padding: 4rem 0 3rem;
  background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.22), transparent 55%),
    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.18), transparent 55%);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
}

.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 2rem;
  align-items: center;
}

.hero-title {
  font-size: 2.6rem;
  margin: 0 0 0.75rem;
}

.hero-tagline {
  color: #cbd5f5;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.product-icon {
  width: 200px;
  height: 200px;
  border-radius: 40px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.5);
}

.geography-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.2);
  color: #7dd3fc;
  margin-top: 1rem;
}

.section-header h2 {
  margin: 0 0 0.75rem;
}

.background-section,
.problem-section,
.market-section,
.solution-section,
.comparative-section,
.vision-section,
.metrics-section,
.timing-section,
.pricing-section,
.related-section,
.product-cta-section {
  padding: 3.5rem 0;
}

.background-section .summary-text {
  color: #cbd5f5;
  max-width: 720px;
}

.insight-box {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.challenges-grid,
.features-grid,
.metrics-grid,
.timing-grid,
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.challenge-card,
.feature-card,
.metric-card,
.timing-card,
.related-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 1.25rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.challenge-card:hover,
.feature-card:hover,
.metric-card:hover,
.timing-card:hover,
.related-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.4);
}

.comparison-table {
  margin-top: 2rem;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: rgba(15, 23, 42, 0.8);
}

.table-row:nth-child(even) {
  background: rgba(30, 41, 59, 0.6);
}

.header-cell,
.table-cell {
  padding: 1rem 1.25rem;
  border-right: 1px solid rgba(148, 163, 184, 0.12);
}

.header-cell:last-child,
.table-cell:last-child {
  border-right: none;
}

.pricing-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.pricing-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 1.5rem;
  padding: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pricing-card.popular {
  border-color: rgba(56, 189, 248, 0.6);
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.45);
}

.popular-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(56, 189, 248, 0.2);
  color: #7dd3fc;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.tier-features ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
}

.related-card {
  cursor: pointer;
}

.related-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
}

.product-cta-section {
  background: linear-gradient(120deg, rgba(56, 189, 248, 0.15), rgba(34, 197, 94, 0.2));
}

.product-cta-section .cta-content {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 1.75rem;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  .product-icon {
    width: 160px;
    height: 160px;
  }
}
</style>
