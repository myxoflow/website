<template>
  <main class="flex flex-col gap-20">
    <!-- Hero Section -->
    <HeroSection :hero="homeStore.heroSection" />

    <!-- Philosophy Section -->
    <PhilosophySection :philosophy="homeStore.philosophy" />

    <!-- Operational Model Section -->
    <OperationalModelSection :model="homeStore.operationalModel" />

    <!-- Final CTA Section -->
    <FinalCTASection :cta="homeStore.homePageCTA" />
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
</script>

<style scoped>
main {
  padding-top: 4rem;
}
</style>
