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

    <!-- HEADER with Navigation -->
    <q-header
      bordered
      class="z-20 bg-night-900/70 border-b border-white/10 backdrop-blur-md shadow-soft"
    >
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4"
      >
        <!-- Left: logo / brand -->
        <div class="flex items-center gap-3">
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <q-avatar square size="40px" class="sm:size-50">
              <img src="../assets/icons/main/myxoflow.svg" alt="MyxoFlow Logo" />
            </q-avatar>
            <span class="text-base sm:text-lg font-semibold">MyxoFlow</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav
          class="hidden items-center gap-4 text-xs font-medium text-slate-300 md:flex lg:gap-6"
        >
          <router-link
            v-for="item in simpleNavItems"
            :key="item.path"
            :to="item.path"
            class="relative rounded-full px-3 py-1.5 transition-all duration-200 hover:text-white hover:bg-white/5"
            active-class="text-white bg-white/10"
          >
            {{ item.label }}
          </router-link>
          
          <!-- Dropdown items -->
          <div
            v-for="item in dropdownNavItems"
            :key="item.path"
            class="relative"
            @mouseenter="() => openDropdown = item.path"
            @mouseleave="() => openDropdown = null"
          >
            <button
              class="relative rounded-full px-3 py-1.5 transition-all duration-200 hover:text-white hover:bg-white/5"
              @click="navigate(item.path)"
            >
              {{ item.label }}
            </button>
            <div
              v-show="openDropdown === item.path"
              class="absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl border border-white/10 bg-night-900/95 backdrop-blur-xl shadow-soft"
            >
              <router-link
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="block px-4 py-2.5 text-sm hover:bg-white/5 first:rounded-t-2xl last:rounded-b-2xl transition-colors"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Right: Language Switcher -->
        <div class="hidden items-center gap-2 sm:flex">
          <LanguageSwitcher
            class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-xs border border-white/10 hover:bg-white/10 transition-colors"
          />
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors md:hidden"
        >
          <q-icon
            :name="mobileMenuOpen ? 'close' : 'menu'"
            size="24px"
            class="text-white"
          />
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-show="mobileMenuOpen"
          class="md:hidden border-t border-white/10 bg-night-900/95 backdrop-blur-xl"
        >
          <nav class="flex flex-col gap-1 px-4 py-4">
            <router-link
              v-for="item in simpleNavItems"
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              active-class="text-white bg-white/10"
            >
              {{ item.label }}
            </router-link>
            
            <!-- Mobile Dropdown items -->
            <div
              v-for="item in dropdownNavItems"
              :key="item.path"
              class="flex flex-col"
            >
              <button
                @click="toggleMobileDropdown(item.path)"
                class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {{ item.label }}
                <q-icon
                  :name="mobileOpenDropdown === item.path ? 'expand_less' : 'expand_more'"
                  size="20px"
                />
              </button>
              <div
                v-show="mobileOpenDropdown === item.path"
                class="flex flex-col gap-1 pl-4 mt-1"
              >
                <router-link
                  v-for="child in item.children"
                  :key="child.path"
                  :to="child.path"
                  @click="mobileMenuOpen = false"
                  class="px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {{ child.label }}
                </router-link>
              </div>
            </div>

            <!-- Mobile Language Switcher -->
            <div class="mt-4 pt-4 border-t border-white/10">
              <LanguageSwitcher
                class="w-full rounded-full bg-white/5 px-3 py-2.5 text-xs font-medium text-slate-200 backdrop-blur-xs border border-white/10 hover:bg-white/10 transition-colors text-center"
              />
            </div>
          </nav>
        </div>
      </transition>
    </q-header>

    <!-- PAGE CONTAINER (CRITICAL FOR ROUTING) -->
    <q-page-container
      class="relative z-10 flex min-h-[calc(100vh-80px)] justify-center"
    >
      <main
        class="mx-auto flex w-full max-w-7xl flex-col px-3 pb-8 pt-4 sm:px-4 sm:pb-10 sm:pt-6 md:px-6 md:pb-12 md:pt-10 animate-fade-up"
      >
        <!-- Primary content card with glass effect -->
        <section
          class="relative w-full rounded-3xl sm:rounded-4xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl"
        >
          <!-- Subtle inner border/glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-3xl sm:rounded-4xl border border-white/5"
          />

          <!-- Slot content -->
          <div class="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
            <router-view />
          </div>
        </section>
      </main>
    </q-page-container>

    <!-- FOOTER -->
    <AppFooter />

    <!-- AMBIENT LIGHT EFFECT -->
    <TubeLight class="hidden lg:block" />
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
const openDropdown = ref<string | null>(null)
const mobileMenuOpen = ref(false)
const mobileOpenDropdown = ref<string | null>(null)

// Computed
const simpleNavItems = computed(() => 
  nav.filter((i): i is NavigationItemBase => !('children' in i) && i.label.toLowerCase() !== 'home')
)

const dropdownNavItems = computed(() => 
  nav.filter((i): i is NavigationParent => 'children' in i)
)

// Methods
function navigate(path: string) {
  router.push(path)
}

function toggleMobileDropdown(path: string) {
  mobileOpenDropdown.value = mobileOpenDropdown.value === path ? null : path
}

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
  min-height: calc(100vh - 80px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
