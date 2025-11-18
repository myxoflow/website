<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>MyxoFlow</q-toolbar-title>
        <LanguageSwitcher />
      </q-toolbar>
    </q-header>

    <AppHeader :nav="nav" />
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />
    <TubeLight />
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import { initLang } from 'src/composables/useLang'
import AppHeader from 'src/components/AppHeader.vue'
import AppFooter from 'src/components/AppFooter.vue'
import TubeLight from 'src/components/TubeLight.vue'
import LanguageSwitcher from 'src/components/LanguageSwitcher.vue'

const layoutStore = useLayoutStore()
const nav = computed(() => layoutStore.navigation)

onMounted(() => {
  initLang()
})
</script>
