<template>
  <div>
    <Example refName="yesno" :wheelData="yesNoData" />
    <div class="divider"></div>
    <Example refName="names" :wheelData="namesData" />
    <div class="divider"></div>
    <Example refName="eat" :wheelData="eatData" />
    <div class="divider"></div>
    <Example refName="numbers" :wheelData="numbersData" />
    <div class="divider"></div>
    <Example refName="roulette" :wheelData="rouletteData" />
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

<style>

</style>