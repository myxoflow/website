import { ref } from 'vue'

export const currentLang = ref<'en' | 'it' | 'de'>('en')

export function setLang(lang: 'en' | 'it' | 'de') {
  currentLang.value = lang
  // Optionally persist to localStorage
  localStorage.setItem('lang', lang)
}

// Load saved language on app init
export function initLang() {
  const saved = localStorage.getItem('lang')
  if (saved === 'en' || saved === 'it' || saved === 'de') {
    currentLang.value = saved
  }
}
