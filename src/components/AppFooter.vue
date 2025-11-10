<template>
  <q-footer
    v-if="isAtBottom"
    bordered
    class="footer"
  >
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
import { ref, onMounted, onUnmounted } from "vue";
import navigationJson from "../data/navigation.json";

const footer = navigationJson.footer;
const isAtBottom = ref(false);

const checkScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // Trigger when near bottom (500px tolerance)
  isAtBottom.value = scrollTop + windowHeight >= fullHeight - 500;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // check initial state
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.3s ease;
  opacity: 1;
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
  margin-top: none;
  font-size: 0.9em;
  text-align: center;
}
</style>
