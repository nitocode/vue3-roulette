<template>
  <div>
    <Navbar />
    <div class="container mx-auto my-14 px-4 py-16 lg:py-0">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Container",
  components: { Navbar, Footer }
}
</script>
