<template>
  <section class="operational-section">
    <h2 class="section-title">{{ model.title }}</h2>
    <p class="section-subtitle">{{ model.subtitle }}</p>

    <div class="steps-grid">
      <q-card
        v-for="(step, i) in model.steps"
        :key="i"
        flat
        bordered
        class="step-card"
      >
        <q-card-section>
          <div class="step-number">{{ step.number }}</div>
          <q-icon :name="step.icon" size="30px" class="step-icon" />
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  model: {
    title: string
    subtitle: string
    steps: { number: string; title: string; description: string; icon: string }[]
  }
}>()
</script>

<style scoped>
.operational-section {
  padding: 4rem 1.5rem;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #666;
  margin-bottom: 2.5rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.step-card {
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.step-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}

.step-icon {
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}

.step-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
