<template>
  <q-select
    v-model="lang"
    :options="langs"
    label="Language"
    @update:model-value="setLang"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { setLang, currentLang } from 'src/composables/useLang'

const langs = [
  { label: 'English', value: 'en' },
  { label: 'Italiano', value: 'it' },
  { label: 'Deutsch', value: 'de' }
]
const lang = ref(currentLang.value)
</script>
