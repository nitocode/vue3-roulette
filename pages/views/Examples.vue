<template>
  <div>
    <Example
      class="big-wheel"
      ref-name="eat"
      :wheel-data="eatData"
    />
    <div class="divider" />
    <Example
      ref-name="yesno"
      :wheel-data="yesNoData"
    />
    <div class="divider" />
    <Example
      class="big-wheel"
      ref-name="roulette"
      :wheel-data="rouletteData"
    />
    <div class="divider" />
    <Example
      ref-name="names"
      :wheel-data="namesData"
    />
    <div class="divider" />
    <Example
      ref-name="numbers"
      :wheel-data="numbersData"
    />
  </div>
</template>

<script>
import Example from "../components/Example.vue";
import { yesNoData, namesData, eatData, numbersData, rouletteData } from "../data/examplesData";
export default {
  name: "Examples",
  components: { Example },
  data () {
    return {
      yesNoData,
      namesData,
      eatData,
      numbersData,
      rouletteData
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 450px){
  :deep(.big-wheel .relative) {
    transform: scale(0.7);
  }
}

</style>