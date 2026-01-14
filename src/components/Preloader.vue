<!-- components/Preloader.vue -->
<template>
  <div class="preloader" v-if="show">
    <div class="preloader-content">
      <img src="../assets/logo.svg" alt="Loading..." class="preloader-image" />
     </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  data() {
    return {
      show: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 1500);
  }
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.preloader-content {
  text-align: center;
}

.preloader-image {
  width: 200px;
  height: 200px;
}

.preloader p {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>
