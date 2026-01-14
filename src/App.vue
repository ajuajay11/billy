<template>
  <div id="app-container">
    <Preloader />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Lenis from 'lenis';
import Preloader from './components/Preloader.vue';

let lenis = null;

onMounted(() => {
  lenis = new Lenis({
    autoRaf: true,
  });
  window.lenis = lenis;
});

onUnmounted(() => {
  lenis?.destroy();
});
</script>
