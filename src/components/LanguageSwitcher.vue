<template>
  <div class="language-switcher">
    <q-select
      :model-value="currentLang"
      :options="options"
      dense
      outlined
      emit-value
      map-options
      style="width: 120px; min-width: 120px"
      @update:model-value="changeLang"
      dropdown-icon="language"
    />
  </div>
</template>

<script setup lang="ts">
import { currentLang, setLang } from 'src/composables/useLang'

const options = [
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇮🇹 Italiano', value: 'it' },
  { label: '🇩🇪 Deutsch', value: 'de' }
]

const changeLang = (newLang: string) => {
  setLang(newLang as 'en' | 'it' | 'de')
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  margin-left: auto;
  z-index: 2000;
}

:deep(.q-select__control) {
  padding: 8px;
}
</style>
