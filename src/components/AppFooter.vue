<template>
  <q-footer bordered class="footer">
    <div class="row footer-nav">
      <div
        class="col footer-section"
        v-for="(section, sectionName) in footer"
        :key="sectionName"
      >
        <div class="footer-section-name">
          {{ sectionName }}
        </div>
        <q-list dense>
          <q-item
            v-for="link in section"
            :key="link.path"
            clickable
            tag="router-link"
            :to="link.path"
          >
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="footer-trademark">
      MyxoFlow<br />
      The New Way
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import navigationJson from "../data/navigation.json";
const footer = navigationJson.footer;
</script>

<style scoped>
.footer {
  background-color: var(--q-bg-color);
  color: var(--q-text-color);
  border-top: 1px solid var(--q-border-color);
  padding: 20px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
/* hide footer unless at the end of the last page */
  margin-top: auto;
}

.footer-nav {
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-section {
  margin: 10px;
  text-align: center;
  padding: 0 10px;
}

.footer-section-name {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 8px;
}
</style>
