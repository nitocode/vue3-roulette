<template>
  <div>
    <Example class="big-wheel" refName="eat" :wheelData="eatData" />
    <div class="divider"></div>
    <Example refName="yesno" :wheelData="yesNoData" />
    <div class="divider"></div>
    <Example class="big-wheel" refName="roulette" :wheelData="rouletteData" />
    <div class="divider"></div>
    <Example refName="names" :wheelData="namesData" />
    <div class="divider"></div>
    <Example refName="numbers" :wheelData="numbersData" />
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