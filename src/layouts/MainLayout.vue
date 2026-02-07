<template>
  <q-layout
    view="hHh lpR fFf"
    class="min-h-screen bg-night-950 text-slate-100 font-sans relative overflow-hidden"
  >
    <!-- Gradient + glow background -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-night-900/90 via-night-950 to-black"
    />
    <div
      class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-primary-500/20 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-electric/25 blur-3xl"
    />

    <!-- HEADER with Language Switcher -->
    <q-header
      bordered
      class="z-20 bg-night-900/70 border-b border-white/10 backdrop-blur-md shadow-soft"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4"
      >
        <!-- Left: logo / brand -->
        <div class="flex items-center gap-3">
          <TubeLight class="hidden sm:block" />
          <q-toolbar-title class="text-sm sm:text-base font-semibold">MyxoFlow</q-toolbar-title>
          <LanguageSwitcher />
        </div>
      </div>
    </q-header>

    <!-- CUSTOM HEADER (your AppHeader) -->
    <AppHeader :nav="nav" />

    <!-- PAGE CONTAINER (CRITICAL FOR ROUTING) -->
    <q-page-container
      class="relative z-10 flex min-h-[calc(100vh-120px)] justify-center"
    >
      <main
        class="mx-auto flex w-full max-w-6xl flex-col px-4 pb-10 pt-6 md:px-6 md:pb-12 md:pt-10 animate-fade-up"
      >
        <!-- Primary content card with glass effect -->
        <section
          class="relative w-full rounded-4xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl"
        >
          <!-- Subtle inner border/glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-4xl border border-white/5"
          />

          <!-- Slot content -->
          <div class="relative z-10 p-4 sm:p-6 md:p-8">
            <router-view />
          </div>
        </section>
      </main>
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
