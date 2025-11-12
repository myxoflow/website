<template>
  <section class="philosophy-section">
    <h2 class="section-title">{{ philosophy.title }}</h2>
    <p class="section-subtitle">{{ philosophy.subtitle }}</p>

    <div class="philosophy-grid">
      <q-card
        v-for="(item, i) in philosophy.principles"
        :key="i"
        flat
        bordered
        class="philosophy-card"
      >
        <q-card-section>
          <q-icon :name="item.icon" size="36px" class="card-icon" />
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-text">{{ item.description }}</p>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  philosophy: {
    title: string
    subtitle: string
    principles: { icon: string; title: string; description: string }[]
  }
}>()
</script>

<style scoped>
.philosophy-section {
  text-align: center;
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.philosophy-card {
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.philosophy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card-icon {
  color: var(--q-primary);
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
