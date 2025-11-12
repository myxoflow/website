<template>
  <section class="final-cta">
    <h2 class="cta-title">{{ cta.title }}</h2>
    <p class="cta-subtitle">{{ cta.subtitle }}</p>

    <div class="cta-buttons">
      <q-btn color="primary" unelevated :label="cta.primary" />
      <q-btn flat color="secondary" :label="cta.secondary" />
    </div>

    <p class="cta-guarantee">{{ cta.guarantee }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cta: {
    title: string
    subtitle: string
    primary: string
    secondary: string
    guarantee: string
  }
}>()
</script>

<style scoped>
.final-cta {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 5rem 1.5rem;
  border-radius: 12px;
  max-width: 960px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cta-guarantee {
  color: #777;
  font-size: 0.95rem;
}
</style>
