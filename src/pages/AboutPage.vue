<template>
  <main class="page-section">
    <h1 class="section-title">{{ network.title }}</h1>

    <div class="network-cards">
      <q-card flat bordered>
        <q-card-section>
          <h3>{{ network.deployment.title }}</h3>
          <p><strong>{{ network.deployment.scope }}</strong></p>
          <p>{{ network.deployment.description }}</p>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <h3>{{ network.supply.title }}</h3>
          <p><strong>{{ network.supply.scope }}</strong></p>
          <p>{{ network.supply.description }}</p>
        </q-card-section>
      </q-card>
    </div>

    <section class="revenue">
      <h2>{{ revenueModel.title }}</h2>
      <ul>
        <li v-for="(stream, i) in revenueModel.streams" :key="i">
          <strong>{{ stream.name }}</strong> — {{ stream.description }}
        </li>
      </ul>
    </section>

    <section class="vision">
      <h2>{{ vision.title }}</h2>
      <ul>
        <li v-for="(goal, i) in vision.goals" :key="i">{{ goal }}</li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCompanyStore } from '../stores/useCompanyStore'
const store = useCompanyStore()
const { network, revenueModel, vision } = store
</script>

<style scoped>
.page-section {
  padding: 4rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.network-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.revenue,
.vision {
  margin-top: 3rem;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>
