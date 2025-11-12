<template>
  <div class="company-page">

    <!-- Company Info -->
    <section id="company-info" class="section card-section">
      <div class="container text-center">
        <h1 class="text-h2 q-mb-md">{{ company.name }}</h1>
        <p class="text-h6 text-primary q-mb-lg">{{ company.tagline }}</p>
        <p class="text-body1 q-mb-lg">{{ company.description }}</p>

        <div class="row justify-center q-gutter-lg q-mt-lg">
          <div class="row items-center q-gutter-sm">
            <q-icon name="email" size="20px" />
            <a :href="`mailto:${company.contact.email}`" class="text-weight-bold">{{ company.contact.email }}</a>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-icon name="phone" size="20px" />
            <a :href="`tel:${company.contact.phone}`" class="text-weight-bold">{{ company.contact.phone }}</a>
          </div>
        </div>

        <div class="row justify-center q-gutter-md q-mt-md">
          <q-btn
            v-for="social in company.contact.social"
            :key="social.platform"
            :label="social.platform"
            flat
            color="primary"
            @click="openLink(social.url)"
          />
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section id="philosophy" class="section card-section">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h4 q-mb-md">{{ philosophy.title }}</h2>
          <p class="text-body1">{{ philosophy.subtitle }}</p>
        </div>

        <div class="row q-col-gutter-xl q-mb-lg">
          <div v-for="principle in philosophy.principles" :key="principle.title" class="col-12 col-md-4">
            <div class="card text-center q-pa-md">
              <q-icon :name="principle.icon" size="48px" color="primary" class="q-mb-md" />
              <h3 class="text-h6 q-mb-sm">{{ principle.title }}</h3>
              <p class="text-body2">{{ principle.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section id="team" class="section card-section">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h4 q-mb-md">{{ team.title }}</h2>
          <p class="text-body1">{{ team.subtitle }}</p>
        </div>

        <div class="row q-col-gutter-xl">
          <div v-for="member in team.members" :key="member.name" class="col-12 col-md-6">
            <div class="card q-pa-md">
              <div class="row items-center q-gutter-md q-mb-md">
                <q-avatar size="80px">
                  <img :src="member.avatar" :alt="member.name" />
                </q-avatar>
                <div>
                  <h3 class="text-h6 q-mb-xs">{{ member.name }}</h3>
                  <p class="text-primary text-weight-bold q-mb-none">{{ member.role }}</p>
                </div>
              </div>

              <p class="text-body2 q-mb-md">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { QIcon, QBtn, QAvatar } from 'quasar'

const companyData = {
  company: {
    name: "MyxoFlow",
    tagline: "Decentralized Building, Real Results",
    description: "Inspired by nature's most efficient problem-solver, the slime mold...",
    contact: {
      email: "info@myxoflow.com",
      phone: "(+39) 3758327534",
      social: [
        { platform: "github", url: "https://github.com/myxoflow" },
        { platform: "linkedin", url: "https://linkedin.com/company/myxoflow" }
      ]
    }
  },
  philosophy: {
    title: "Our Philosophy",
    subtitle: "We challenge traditional business models with transparency and efficiency",
    principles: [
      { icon: "hub", title: "Decentralized & Adaptive", description: "No corporate hierarchy..." },
      { icon: "balance", title: "Fair & Transparent", description: "Companies overcharge assuming users are 'price stupid.'..." },
      { icon: "speed", title: "Fast & Accountable", description: "From idea to execution in 30 days..." }
    ]
  },
  team: {
    title: "The Core System",
    subtitle: "Two nodes, one adaptive intelligence",
    members: [
      { name: "Bobby Seelam", role: "Founder & Product Lead", avatar: "/images/team/bobby.jpg", bio: "Brings complete capability from idea to execution..." },
      { name: "Saivinay Manda", role: "Full-Stack & AI Lead", avatar: "/images/team/saivinay.jpg", bio: "Builds intelligent systems that ensure real-time optimization..." }
    ]
  }
}

const company = reactive(companyData.company)
const philosophy = reactive(companyData.philosophy)
const team = reactive(companyData.team)

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.company-page {
  width: 100%;
}

.section {
  padding: 4rem 1rem;
}

.card-section {
  background-color: var(--q-color-grey-2);
  margin-bottom: 2rem;
  border-radius: 12px;
}

.section-header h2 {
  font-weight: 700;
}

.card {
  border-radius: 12px;
  box-shadow: var(--q-box-shadow-lg);
}
</style>
