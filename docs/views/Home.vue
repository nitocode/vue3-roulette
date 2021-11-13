<template>
  <div>
    <Roulette
      ref="wheel"
      @click="launchWheel"
      :items="items"
      :first-item-index="firstItemIndex"
      :centered-indicator="wheelSettings.centeredIndicator"
      :indicator-position="wheelSettings.indicatorPosition"
      :size="wheelSettings.size"
      :display-Shadow="wheelSettings.displayShadow"
      :display-border="wheelSettings.displayBorder"
      :display-indicator="wheelSettings.displayIndicator"
      :duration="wheelSettings.duration"
      :result-variation="wheelSettings.resultVariation"
      :easing="wheelSettings.easing"
      @wheel-start="wheelStartedCallback"
      @wheel-end="wheelEndedCallback"
      :counter-clockwise="wheelSettings.counterClockwise"
      :horizontal-content="wheelSettings.horizontalContent"
      :base-display="wheelSettings.baseDisplay"
      :base-size="wheelSettings.baseSize"
      :base-display-indicator="wheelSettings.baseDisplayIndicator"
      :base-display-shadow="wheelSettings.baseDisplayShadow"
      :base-background="wheelSettings.baseBackground"
    >
      <template #baseContent>
        <div
          v-if="wheelSettings.baseHtmlContent"
          v-html="wheelSettings.baseHtmlContent"
        ></div>
      </template>
    </Roulette>
    <ItemsManager
      class="item-manager"
      :initial-items="items"
      :initial-first-item-index="firstItemIndex"
      @update-items="onSoftReset"
    />
    <WheelManager
      :initial-settings="wheelSettings"
      @hard-reset="onHardReset"
    />
  </div>
</template>

<script>
import ItemsManager from "../components/ItemsManager.vue";
import WheelManager from "../components/WheelManager.vue";
import Roulette from "../../src/components/Roulette.vue";

export default {
  name: "Home",

  components: {
    Roulette,
    ItemsManager,
    WheelManager
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
      ],
      firstItemIndex: { value: 0 },
      wheelSettings: {
        centeredIndicator: true,
        indicatorPosition: "top",
        size: 300,
        displayShadow: true,
        duration: 5,
        resultVariation: 70,
        easing: "bounce",
        counterClockwise: true,
        horizontalContent: false,
        displayBorder: true,
        displayIndicator: true,
        baseDisplay: true,
        baseSize: 100,
        baseDisplayShadow: true,
        baseDisplayIndicator: true,
        baseBackground: "#EEAA33",
        baseHtmlContent: "Awesome<br>Wheel",
      }
    }
  },

  methods: {
    launchWheel() {
      this.$refs.wheel.launchWheel();
    },
    wheelStartedCallback() {
      console.log("wheel started !");
    },
    wheelEndedCallback(resultItem) {
      console.log("wheel ended !", resultItem);
    },
  }
}
</script>

<style>

</style>