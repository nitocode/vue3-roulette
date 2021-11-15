<template>
  <div>
    <Example refName="example1" :wheelData="yesNoData" />
    <div class="divider"></div>
    <Example refName="names" :wheelData="namesData" />
  </div>
</template>

<script>
import Example from "../components/Example.vue";
import { yesNoData, namesData } from "../data/examplesData";
export default {
  name: "Examples",
  components: { Example },
  data () {
    return {
      yesNoData,
      namesData
    }
  }
}
</script>

<style>

</style>