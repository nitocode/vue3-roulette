<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { FortuneWheel } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
   FortuneWheel,
  },
  methods: {
    launchWheel() {
      this.$refs.wheel.launchWheel();
    },
  },
  data () {
    return {
      items: [
        { id: 1, name: "Banana", htmlContent: "Banana", background: "" },
        { id: 2, name: "Apple", htmlContent: "Apple", background: "" },
        {
          id: 3,
          name: "Orange and Purple",
          htmlContent: "Orange<br>and Purple",
          background: "",
        },
        { id: 4, name: "Cherry", htmlContent: "Cherry", background: "" },
        {
          id: 5,
          name: "Strawberry",
          htmlContent: "Strawberry",
          background: "",
        },
        { id: 6, name: "Grape", htmlContent: "Grape", background: "" },
      ]
    }
  }
});
</script>

<template>
  <div id="app">
    <FortuneWheel 
      ref="wheel"
      :items="items"
      @click="launchWheel"
    />
  </div>
</template>
