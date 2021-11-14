<template>
  <div>
    <Roulette ref="wheel1" :items="firstWheel" />
  </div>
</template>

<script>
import Roulette from "../../src/components/Roulette.vue";
export default {
  name: "Examples",
  components: { Roulette },
  data () {
    return {
      firstWheel: [
        { id: 1, name: "Oui", htmlContent: "Oui", textColor: "", background: "" },
        { id: 2, name: "Non", htmlContent: "Non", textColor: "", background: "" },
        { id: 3, name: "Oui", htmlContent: "Oui", textColor: "", background: "" },
        { id: 4, name: "Non", htmlContent: "Non", textColor: "", background: "" },
        { id: 5, name: "Oui", htmlContent: "Oui", textColor: "", background: "" },
        { id: 6, name: "Non", htmlContent: "Non", textColor: "", background: "" }
      ]
    }
  }
}
</script>

<style>

</style>