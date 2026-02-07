<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <!-- Gradient Background -->
    <div class="gradient-bg"></div>
    <div class="glow-orb glow-orb-top"></div>
    <div class="glow-orb glow-orb-bottom"></div>

    <!-- HEADER -->
    <q-header bordered class="app-header">
      <q-toolbar class="toolbar-container">
        <!-- Logo -->
        <router-link to="/" class="logo-link">
          <q-avatar square size="40px">
            <img src="../assets/icons/main/myxoflow.svg" alt="Logo" />
          </q-avatar>
          <q-toolbar-title class="logo-title">MyxoFlow</q-toolbar-title>
        </router-link>

        <q-space />

        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <router-link
            v-for="item in simpleNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
          >
            {{ item.label }}
          </router-link>

          <!-- Dropdown menus -->
          <q-btn-dropdown
            v-for="item in dropdownNavItems"
            :key="item.path"
            :label="item.label"
            flat
            dense
            class="nav-dropdown"
          >
            <q-list>
              <q-item
                v-for="child in item.children"
                :key="child.path"
                clickable
                v-close-popup
                @click="() => $router.push(child.path)"
              >
                <q-item-section>{{ child.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <!-- Language Switcher -->
        <LanguageSwitcher class="lang-switcher desktop-only" />

        <!-- Mobile Menu Button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="mobile-only"
          @click="mobileMenuOpen = true"
        />
      </q-toolbar>
    </q-header>

    <!-- Mobile Drawer -->
    <q-drawer
      v-model="mobileMenuOpen"
      overlay
      behavior="mobile"
      :width="280"
      class="mobile-drawer"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="item in simpleNavItems"
            :key="item.path"
            clickable
            v-ripple
            @click="() => { $router.push(item.path); mobileMenuOpen = false }"
          >
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>

          <q-expansion-item
            v-for="item in dropdownNavItems"
            :key="item.path"
            :label="item.label"
            icon="expand_more"
          >
            <q-item
              v-for="child in item.children"
              :key="child.path"
              clickable
              v-ripple
              @click="() => { $router.push(child.path); mobileMenuOpen = false }"
              class="q-pl-lg"
            >
              <q-item-section>{{ child.label }}</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator class="q-my-md" />

          <q-item>
            <q-item-section>
              <LanguageSwitcher />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- PAGE CONTAINER -->
    <q-page-container class="page-container">
      <q-page class="page-content">
        <div class="content-card">
          <router-view />
        </div>
      </q-page>
    </q-page-container>

    <!-- FOOTER -->
    <AppFooter />

    <!-- TubeLight Effect -->
    <TubeLight class="desktop-only" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { initLang } from 'src/composables/useLang'
import navigationJson from 'src/data/navigation.json'

// Import Components
import AppFooter from 'src/components/AppFooter.vue'
import TubeLight from 'src/components/TubeLight.vue'
import LanguageSwitcher from 'src/components/LanguageSwitcher.vue'

// Define Types
interface NavigationItemBase {
  label: string
  path: string
  external?: boolean
}

interface NavigationParent extends NavigationItemBase {
  children: NavigationItemBase[]
}

type NavigationItem = NavigationItemBase | NavigationParent

const nav = navigationJson.navigation as NavigationItem[]
const router = useRouter()

// State
const mobileMenuOpen = ref(false)

// Computed
const simpleNavItems = computed(() => 
  nav.filter((i): i is NavigationItemBase => !('children' in i) && i.label.toLowerCase() !== 'home')
)

const dropdownNavItems = computed(() => 
  nav.filter((i): i is NavigationParent => 'children' in i)
)

// Initialize language on mount
onMounted(() => {
  initLang()
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #020617;
  color: #f1f5f9;
  position: relative;
  overflow-x: hidden;
}

/* Background Effects */
.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.9), #020617, #000);
  pointer-events: none;
  z-index: 0;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  opacity: 0.3;
  z-index: 0;
}

.glow-orb-top {
  top: -128px;
  left: 50%;
  transform: translateX(-50%);
  width: 576px;
  height: 288px;
  background: rgba(99, 102, 241, 0.2);
}

.glow-orb-bottom {
  bottom: -96px;
  right: 0;
  width: 256px;
  height: 256px;
  background: rgba(14, 165, 233, 0.25);
}

/* Header */
.app-header {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.toolbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.desktop-nav {
  display: none;
  gap: 1rem;
  align-items: center;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .desktop-only {
    display: none !important;
  }
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.nav-dropdown {
  font-size: 0.875rem;
  color: #cbd5e1;
}

.lang-switcher {
  margin-left: 0.5rem;
}

/* Mobile Drawer */
.mobile-drawer {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  color: #f1f5f9;
}

.mobile-drawer :deep(.q-item) {
  color: #cbd5e1;
  border-radius: 0.5rem;
  margin: 0.25rem 0;
}

.mobile-drawer :deep(.q-item:hover) {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

/* Page Container */
.page-container {
  position: relative;
  z-index: 10;
  min-height: calc(100vh - 80px);
}

.page-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (min-width: 640px) {
  .page-content {
    padding: 2.5rem 1.5rem;
  }
}

@media (min-width: 768px) {
  .page-content {
    padding: 3rem 1.5rem;
  }
}

/* Content Card */
.content-card {
  position: relative;
  width: 100%;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  padding: 1rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.6);
}

@media (min-width: 640px) {
  .content-card {
    padding: 1.5rem;
    border-radius: 2rem;
  }
}

@media (min-width: 768px) {
  .content-card {
    padding: 2rem;
  }
}

/* Animations */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-card {
  animation: fadeUp 0.5s ease-out;
}
</style>
