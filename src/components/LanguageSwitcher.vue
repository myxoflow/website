<!-- src/components/LanguageSwitcher.vue -->
<template>
  <q-select
    v-model="lang"
    :options="options"
    dense
    outlined
    emit-value
    map-options
    style="width: 120px"
    @update:model-value="changeLang"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { currentLang, setLang } from 'src/composables/useLang'

const lang = ref(currentLang.value)
const options = [
  { label: 'English', value: 'en' },
  { label: 'Italiano', value: 'it' },
  { label: 'Deutsch', value: 'de' }
]

const changeLang = (newLang: string) => {
  setLang(newLang)
}
</script>
