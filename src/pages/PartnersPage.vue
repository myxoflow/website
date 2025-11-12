<template>
  <main class="page-section">
    <h1>{{ partnerOpportunities.title }}</h1>
    <p class="subtitle">{{ partnerOpportunities.subtitle }}</p>

    <div class="benefits-grid">
      <q-card
        v-for="(benefit, i) in partnerOpportunities.benefits"
        :key="i"
        flat
        bordered
      >
        <q-card-section>
          <q-icon :name="benefit.icon" size="32px" class="benefit-icon" />
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </q-card-section>
      </q-card>
    </div>

    <p class="ideal-partner">{{ partnerOpportunities.ideal }}</p>
  </main>
</template>

<script setup lang="ts">
import { useCompanyStore } from '../stores/useCompanyStore'
const { partnerOpportunities } = useCompanyStore()
</script>

<style scoped>
.page-section {
  padding: 4rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.benefit-icon {
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}

.ideal-partner {
  color: #555;
  font-style: italic;
}
</style>
