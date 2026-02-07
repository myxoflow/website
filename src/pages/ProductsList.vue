<template>
  <div class="products-list-page">
    <section class="products-hero">
      <div class="container">
        <p class="hero-kicker">Solutions</p>
        <h1>Interactive Product Suites</h1>
        <p class="hero-subtitle">
          Swipe through our modular products and pick the stack that fits your market.
        </p>
      </div>
    </section>

    <section class="products-content">
      <div class="container">
        <div class="slider-header">
          <div>
            <h2>Explore the Stack</h2>
            <p>Click a card or slide horizontally to browse.</p>
          </div>
          <div class="slider-actions">
            <button class="slider-btn" type="button" @click="scrollPrev">
              ‹
            </button>
            <button class="slider-btn" type="button" @click="scrollNext">
              ›
            </button>
          </div>
        </div>

        <div ref="sliderRef" class="products-slider" role="list">
          <article
            v-for="product in allProducts"
            :key="product.key"
            class="product-card"
            role="listitem"
            @click="navigateToProduct(product.key)"
          >
            <div class="card-top">
              <div class="product-icon">
                <q-icon name="apps" size="56px" color="primary" />
              </div>
              <span v-if="product.featured" class="featured-badge">
                Featured
              </span>
            </div>

            <div class="card-body">
              <h3>{{ product.name }}</h3>
              <p class="tagline">{{ product.tagline }}</p>
              <p class="description">{{ product.description }}</p>

              <div class="product-tags">
                <span v-for="tag in product.tags.slice(0, 3)" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="product-footer">
              <span class="price">{{ product.pricing.tiers[0]?.price }}</span>
              <q-btn
                label="Learn More"
                color="primary"
                rounded
                unelevated
                @click.stop="navigateToProduct(product.key)"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/useProductStore'

const router = useRouter()
const productStore = useProductStore()
const sliderRef = ref<HTMLElement | null>(null)

const allProducts = computed(() => productStore.allProducts)

const navigateToProduct = async (key: string) => {
  await router.push({ name: 'product', params: { key } })
}

const scrollByAmount = (direction: 'next' | 'prev') => {
  if (!sliderRef.value) return
  const offset = sliderRef.value.clientWidth * 0.8
  sliderRef.value.scrollBy({
    left: direction === 'next' ? offset : -offset,
    behavior: 'smooth',
  })
}

const scrollNext = () => scrollByAmount('next')
const scrollPrev = () => scrollByAmount('prev')
</script>

<style scoped lang="scss">
.products-list-page {
  color: #e2e8f0;
}

.products-hero {
  padding: 5rem 0 3rem;
  text-align: left;
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 60%),
    radial-gradient(circle at 70% 20%, rgba(16, 185, 129, 0.15), transparent 55%);
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  max-width: 560px;
  color: #cbd5f5;
  margin-top: 0.75rem;
}

.products-content {
  padding: 2rem 0 5rem;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.slider-header h2 {
  margin: 0 0 0.4rem;
}

.slider-header p {
  margin: 0;
  color: #9fb3c8;
}

.slider-actions {
  display: flex;
  gap: 0.5rem;
}

.slider-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.slider-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 189, 248, 0.8);
}

.products-slider {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 360px);
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.products-slider::-webkit-scrollbar {
  display: none;
}

.product-card {
  scroll-snap-align: start;
  background: rgba(15, 23, 42, 0.85);
  border-radius: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.15);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  min-height: 420px;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.5);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.featured-badge {
  background: rgba(14, 165, 233, 0.2);
  color: #7dd3fc;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.card-body h3 {
  margin: 0 0 0.5rem;
}

.tagline {
  color: #cbd5f5;
  margin: 0 0 0.75rem;
}

.description {
  color: #94a3b8;
  line-height: 1.6;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(30, 41, 59, 0.8);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: #cbd5f5;
}

.product-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.1rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .slider-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .products-slider {
    grid-auto-columns: minmax(240px, 80vw);
  }
}
</style>
