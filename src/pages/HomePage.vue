<template>
  <main class="home-page">
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-bottom"></div>

    <section class="section-card hero-wrap">
      <HeroSection :hero="homeStore.heroSection" />
    </section>

    <section class="metrics-strip">
      <div class="metric" v-for="metric in metrics" :key="metric.label">
        <p class="metric-value">{{ metric.value }}</p>
        <p class="metric-label">{{ metric.label }}</p>
      </div>
    </section>

    <section class="section-card">
      <PhilosophySection :philosophy="homeStore.philosophy" />
    </section>

    <section class="section-card">
      <OperationalModelSection :model="homeStore.operationalModel" />
    </section>

    <section class="section-card cta-wrap">
      <FinalCTASection :cta="homeStore.homePageCTA" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useHomeStore } from '../stores/useHomeStore'

// Components
import HeroSection from '../components/sections/HeroSection.vue'
import PhilosophySection from '../components/sections/PhilosophySection.vue'
import OperationalModelSection from '../components/sections/OperationalModelSection.vue'
import FinalCTASection from '../components/sections/FinalCTASection.vue'

// Store
const homeStore = useHomeStore()

const metrics = [
  { value: '30 Days', label: 'Deployment Velocity' },
  { value: 'EU Wide', label: 'Execution Coverage' },
  { value: 'Lean Fees', label: 'Transparent Pricing' },
  { value: '24/7', label: 'Network Availability' },
]
</script>

<style scoped>
.home-page {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1.5rem 6rem;
  color: #e2e8f0;
}

.section-card {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 2rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  padding: 3rem 2rem;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(12px);
}

.hero-wrap {
  padding: 1rem 1.5rem 3rem;
}

.cta-wrap {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
}

.metrics-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  text-align: center;
}

.metric {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 1.5rem;
  padding: 1.5rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.35rem;
}

.metric-label {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.ambient-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  z-index: 0;
}

.glow-top {
  top: -80px;
  left: 10%;
  background: rgba(56, 189, 248, 0.6);
}

.glow-bottom {
  bottom: 20%;
  right: 5%;
  background: rgba(34, 197, 94, 0.5);
}

@media (max-width: 768px) {
  .section-card {
    padding: 2rem 1.5rem;
  }
}
</style>
