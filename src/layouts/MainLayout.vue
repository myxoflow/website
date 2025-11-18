<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER with Language Switcher -->
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>MyxoFlow</q-toolbar-title>
        <LanguageSwitcher />
      </q-toolbar>
    </q-header>

    <!-- CUSTOM HEADER (your AppHeader) -->
    <AppHeader :nav="nav" />

    <!-- PAGE CONTAINER (CRITICAL FOR ROUTING) -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <AppFooter />

    <!-- AMBIENT LIGHT EFFECT -->
    <TubeLight />
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { initLang } from 'src/composables/useLang'

// Import Components
import AppHeader from 'src/components/AppHeader.vue'
import AppFooter from 'src/components/AppFooter.vue'
import TubeLight from 'src/components/TubeLight.vue'
import LanguageSwitcher from 'src/components/LanguageSwitcher.vue'

// Use Store for reactive navigation (supports multi-language)
const layoutStore = useLayoutStore()
const nav = computed(() => layoutStore.navigation)

// Initialize language on mount
onMounted(() => {
  initLang()
})
</script>

<style scoped>
/* Ensure layout fills viewport */
:deep(.q-layout) {
  min-height: 100vh;
}

:deep(.q-page-container) {
  min-height: calc(100vh - 120px);
}
</style>
