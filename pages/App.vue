<template>
  <div>
    <Navbar />
    <div class="container mx-auto my-14 px-4 py-16 lg:py-0">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Container",
  components: { Navbar, Footer },
  mounted() {
    // Github pages SPA workaround
    let path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
