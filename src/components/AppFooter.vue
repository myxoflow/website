<template>
  <div class="footer-wrapper">
    <!-- Toggle Button -->
    <button class="footer-toggle" @click="toggleFooter">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50px"
        viewBox="0 -960 960 960"
        width="50px"
        :style="{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }"
      >
        <path
          d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <!-- Footer -->
    <q-footer v-if="isOpen" bordered class="footer">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import navigationJson from "../data/navigation.json";

const footer = navigationJson.footer;
const isOpen = ref(false);

const toggleFooter = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.footer-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1000;
}

.footer-toggle {
  width: 100%;
  height: 50px;
  background: var(--q-bg-color);
  border: none;
  cursor: pointer;
  color: var(--q-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer {
  background-color: var(--q-bg-color);
  color: var(--q-text-color);
  border-top: 1px solid var(--q-border-color);
  padding: 20px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: auto;
  position: relative;
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

.footer-trademark {
  font-size: 0.9em;
  text-align: center;
  margin-top: 10px;
}
</style>
