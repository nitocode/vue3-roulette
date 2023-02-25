<template>
  <div>
    <div class="relative pb-12">
      <Roulette
        v-if="wheelActive"
        :ref="refName"
        :items="items"
        :first-item-index="wheelData.firstItemIndex"
        :centered-indicator="wheelData.wheelSettings.centeredIndicator"
        :indicator-position="wheelData.wheelSettings.indicatorPosition"
        :size="wheelData.wheelSettings.size"
        :display-shadow="wheelData.wheelSettings.displayShadow"
        :display-border="wheelData.wheelSettings.displayBorder"
        :display-indicator="wheelData.wheelSettings.displayIndicator"
        :duration="wheelData.wheelSettings.duration"
        :result-variation="wheelData.wheelSettings.resultVariation"
        :easing="wheelData.wheelSettings.easing"
        :counter-clockwise="wheelData.wheelSettings.counterClockwise"
        :horizontal-content="wheelData.wheelSettings.horizontalContent"
        :base-display="wheelData.wheelSettings.baseDisplay"
        :base-size="wheelData.wheelSettings.baseSize"
        :base-display-indicator="wheelData.wheelSettings.baseDisplayIndicator"
        :base-display-shadow="wheelData.wheelSettings.baseDisplayShadow"
        :base-background="wheelData.wheelSettings.baseBackground"
        @click="launchWheel"
        @wheel-start="wheelStartedCallback"
        @wheel-end="wheelEndedCallback"
      >
        <template #baseContent>
          <div
            v-if="wheelData.wheelSettings.baseHtmlContent"
            v-html="wheelData.wheelSettings.baseHtmlContent"
          />
        </template>
      </Roulette>

      <div 
        v-show="result"
        class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <button
          class="btn btn-xs mx-2"
          @click="onHardReset()"
        >
          Hard reset
        </button>
        <button
          class="btn btn-xs mx-2"
          @click="onSoftReset()"
        >
          Soft reset
        </button>
      </div>
    </div>
    
    <div>
      <button
        class="btn btn-primary"
        @click="showCustomization = !showCustomization"
      >
        <span v-if="!showCustomization">Customize me!</span>
        <span v-else>Hide Customization</span>
      </button> 
    </div>

    <div
      v-if="showCustomization"
      class="mt-10"
    >
      <div class="tabs tabs-boxed justify-center">
        <a
          class="tab"
          :class="{'tab-active': managerId === 1 }"
          @click="managerId = 1"
        >Items manager</a> 
        <a
          class="tab"
          :class="{'tab-active': managerId === 2 }"
          @click="managerId = 2"
        >Wheel manager</a>
      </div>

      <div class="divider" /> 

      <ItemsManager
        v-if="managerId === 1"
        class="item-manager overflow-scroll lg:overflow-auto"
        :initial-items="wheelData.items"
        :initial-first-item-index="wheelData.firstItemIndex"
        @update-items="onSoftReset"
      />
      <WheelManager
        v-if="managerId === 2"
        :initial-settings="wheelData.wheelSettings"
        @hard-reset="onHardReset"
      />

      <div class="mt-4">
        <button
          class="btn btn-primary"
          @click="showCustomization = false"
        >
          <span>Hide Customization</span>
        </button> 
      </div>
    </div>
  </div>
</template>

<script>
import Roulette from "../../src/components/Roulette.vue";
import ItemsManager from "../components/ItemsManager.vue";
import WheelManager from "../components/WheelManager.vue";
export default {
  name: "Example",
  components: { Roulette, ItemsManager, WheelManager },
  props: {
    wheelData: {
      type: Object,
      required: true
    },
    refName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      wheelActive: true,
      result: null,
      items: {},
      showCustomization: false,
      managerId: 1
    }
  },
  mounted () {
    this.items = this.wheelData.items;
  },
  methods: {
    launchWheel() {
      this.$refs[this.refName].launchWheel();
    },
    wheelStartedCallback(resultItem) {
      console.log("wheel started !", resultItem);
    },
    wheelEndedCallback(resultItem) {
      console.log("wheel ended !", resultItem);
      this.result = resultItem;
    },
    onSoftReset(newItemList) {
      this.items = newItemList || this.items;
      this.$refs[this.refName].reset();
    },
    onHardReset() {
      this.wheelActive = false;
      this.result = null;
      setTimeout(() => {
        this.wheelActive = true;
      }, 10);
    },
  }
}
</script>

<style>

</style>