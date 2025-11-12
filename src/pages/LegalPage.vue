<template>
  <div class="legal-page">
    <div class="container">
      <h1>{{ legalContent.title }}</h1>
      <p class="last-updated">Last updated: {{ legalContent.lastUpdated }}</p>

      <div 
        v-for="(section, idx) in legalContent.content" 
        :key="idx" 
        class="legal-section"
      >
        <h2>{{ section.heading }}</h2>
        <p>{{ section.text }}</p>
      </div>

      <div class="legal-navigation">
        <q-separator class="q-my-xl" />
        <h3>Explore Other Legal Sections</h3>
        <ul>
          <li v-for="(link, index) in legalLinks" :key="index">
            <router-link :to="{ name: link.route }">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLegalStore } from '../stores/useLegalStore'

const route = useRoute()
const store = useLegalStore()

const legalContent = computed(() => {
  switch (route.name) {
    case 'privacy':
      return store.privacyPolicy
    case 'cookies':
      return store.cookiesPolicy
    case 'terms':
      return store.terms
    case 'disclaimer':
      return store.disclaimer
    case 'dpa':
      return store.dpa
    default:
      return { title: 'Not Found', lastUpdated: '', content: [] }
  }
})

const legalLinks = computed(() => store.legalLinks)
</script>

<style scoped lang="scss">
.legal-page {
  padding: 80px 0;

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .last-updated {
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 40px;
  }

  .legal-section {
    margin-bottom: 32px;
    border-bottom: 1px solid var(--q-grey-4);
    padding-bottom: 24px;

    &:last-child {
      border-bottom: none;
    }

    h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
    }
  }

  .legal-navigation {
    margin-top: 60px;

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 8px;

        a {
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s ease;
          opacity: 0.85;

          &:hover {
            opacity: 1;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .legal-page {
    padding: 60px 0;

    h1 {
      font-size: 28px;
    }

    .legal-section h2 {
      font-size: 20px;
    }
  }
}
</style>
