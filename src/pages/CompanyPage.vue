<template>
  <main class="company-page">
    <header class="company-header">
      <h1 class="company-name">{{ companyInfo.name }}</h1>
      <p class="company-tagline">{{ companyInfo.tagline }}</p>
      <p class="company-description">{{ companyInfo.description }}</p>

      <nav class="company-nav">
        <RouterLink to="/company/about" class="nav-link">About</RouterLink>
        <RouterLink to="/company/how-it-works" class="nav-link">How It Works</RouterLink>
        <RouterLink to="/company/partners" class="nav-link">Partners</RouterLink>
      </nav>
    </header>

    <!-- Philosophy Section -->
    <section class="company-section">
      <h2 class="section-title">{{ companyPhilosophy.title }}</h2>
      <p class="section-subtitle">{{ companyPhilosophy.subtitle }}</p>

      <div class="philosophy-grid">
        <q-card
          v-for="(item, i) in companyPhilosophy.principles"
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

    <!-- Team Section -->
    <section class="company-section">
      <h2 class="section-title">{{ team.title }}</h2>
      <p class="section-subtitle">{{ team.subtitle }}</p>

      <div class="team-grid">
        <q-card
          v-for="(member, i) in team.members"
          :key="i"
          flat
          bordered
          class="team-card"
        >
          <q-card-section class="team-content">
            <img :src="member.avatar" alt="member.name" class="team-avatar" />
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-bio">{{ member.bio }}</p>
            <ul class="member-tasks">
              <li v-for="(task, j) in member.responsibilities" :key="j">{{ task }}</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useCompanyStore } from '../stores/useCompanyStore'
const store = useCompanyStore()
const { companyInfo, companyPhilosophy, team } = store
</script>

<style scoped>
.company-page {
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.company-header {
  text-align: center;
  margin-bottom: 4rem;
}

.company-name {
  font-size: 2.4rem;
  font-weight: 700;
}

.company-tagline {
  font-size: 1.2rem;
  color: var(--q-primary);
  margin: 0.5rem 0 1rem;
}

.company-description {
  color: #555;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.company-nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--q-primary);
  font-weight: 600;
}

.nav-link:hover {
  text-decoration: underline;
}

.company-section {
  margin-bottom: 5rem;
  text-align: center;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.section-subtitle {
  color: #777;
  margin-bottom: 2rem;
}

.philosophy-grid,
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
}
.member-name {
  font-size: 1.3rem;
  font-weight: 600;
}
.member-role {
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}
.member-bio {
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}
.member-tasks {
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
  color: #666;
}
</style>
