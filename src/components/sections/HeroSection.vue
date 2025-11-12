<template>
  <section class="hero-section">
    <div class="hero-badge">
      <q-icon :name="hero.badge.icon" size="24px" />
      <span>{{ hero.badge.text }}</span>
    </div>

    <h1 class="hero-title">{{ hero.title }}</h1>
    <p class="hero-subtitle">{{ hero.subtitle }}</p>

    <ul class="hero-highlights">
      <li v-for="(highlight, i) in hero.highlights" :key="i">
        <q-icon name="check_circle" size="18px" class="highlight-icon" />
        <span>{{ highlight }}</span>
      </li>
    </ul>

<div class="hero-cta">
  <!-- Primary CTA: navigate to /products -->
  <q-btn
    color="primary"
    unelevated
    :label="hero.cta.primary"
    to="/products"
  />

  <!-- Secondary CTA: navigate to /company/partners -->
  <q-btn
    flat
    color="secondary"
    :label="hero.cta.secondary"
    to="/company/partners"
  />
</div>

  </section>
</template>

<script setup lang="ts">
defineProps<{
  hero: {
    badge: { icon: string; text: string }
    title: string
    subtitle: string
    highlights: string[]
    cta: { primary: string; secondary: string }
  }
}>()
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 6rem 1.5rem;
  max-width: 960px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero-subtitle {
  color: #555;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 2rem auto;
}

.hero-highlights {
  list-style: none;
  padding: 0;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.hero-highlights li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
}

.hero-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
