<template>
  <main>
    <Preloader />
    <router-view />
  </main>
</template>

<script setup>
import Lenis from 'lenis';
import Preloader from './components/Preloader.vue';
import { onMounted, onUnmounted } from 'vue';

let lenis = null;

onMounted(() => {
  lenis = new Lenis({
    autoRaf: true,
  });
  
  // Make it globally accessible if needed
  window.lenis = lenis;
});
onUnmounted(() => {
  lenis?.destroy();
});

</script>
