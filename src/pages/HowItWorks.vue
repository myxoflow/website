<template>
  <main class="page-section">
    <header class="how-header">
      <h1 class="title">{{ operationalModel.title }}</h1>
      <p class="subtitle">{{ operationalModel.subtitle }}</p>
      <p class="overview">{{ operationalModel.overview }}</p>
    </header>

    <section class="steps-grid">
      <q-card
        v-for="(step, i) in operationalModel.steps"
        :key="i"
        flat
        bordered
        class="step-card"
      >
        <q-card-section>
          <div class="step-number">{{ step.number }}</div>
          <q-icon :name="step.icon" size="40px" class="step-icon" />
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </q-card-section>
      </q-card>
    </section>

    <footer v-if="operationalModel.cta" class="how-cta">
      <RouterLink :to="operationalModel.cta.link" class="cta-link">
        {{ operationalModel.cta.text }}
      </RouterLink>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { useCompanyStore } from '../stores/useCompanyStore'
const { operationalModel } = useCompanyStore()
</script>

<style scoped>
.page-section {
  padding: 4rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.how-header {
  margin-bottom: 3rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--q-primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.overview {
  max-width: 800px;
  margin: 0 auto 2.5rem;
  color: #555;
  font-size: 1rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.step-card {
  padding: 1.5rem 1rem;
  text-align: center;
}

.step-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--q-primary);
}

.step-icon {
  color: var(--q-primary);
  margin: 0.5rem 0 0.8rem;
}

.step-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #555;
  font-size: 0.95rem;
}

.how-cta {
  margin-top: 2rem;
}

.cta-link {
  display: inline-block;
  background: var(--q-primary);
  color: white;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.cta-link:hover {
  background: var(--q-primary-dark);
}
</style>
