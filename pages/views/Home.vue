<template>
  <div>
    <h1 class="text-4xl">
      Vue3 Roulette
    </h1>
    <div class="py-10 relative">
      <div
        class="wheel-anim"
        :class="{'wheel-anim-started': startAnim}"
      >
        <Roulette
          v-if="wheelActive"
          ref="wheel"
          :items="items"
          :first-item-index="firstItemIndex"
          :centered-indicator="wheelSettings.centeredIndicator"
          :indicator-position="wheelSettings.indicatorPosition"
          :size="wheelSettings.size"
          :display-shadow="wheelSettings.displayShadow"
          :display-border="wheelSettings.displayBorder"
          :display-indicator="wheelSettings.displayIndicator"
          :duration="wheelSettings.duration"
          :result-variation="wheelSettings.resultVariation"
          :easing="wheelSettings.easing"
          :counter-clockwise="wheelSettings.counterClockwise"
          :horizontal-content="wheelSettings.horizontalContent"
          :base-display="wheelSettings.baseDisplay"
          :base-size="wheelSettings.baseSize"
          :base-display-indicator="wheelSettings.baseDisplayIndicator"
          :base-display-shadow="wheelSettings.baseDisplayShadow"
          :base-background="wheelSettings.baseBackground"
          @click="launchWheel"
          @wheel-start="wheelStartedCallback"
          @wheel-end="wheelEndedCallback"
        >
          <template #baseContent>
            <div
              v-if="wheelSettings.baseHtmlContent"
              v-html="wheelSettings.baseHtmlContent"
            />
          </template>
        </Roulette>
      </div>

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

    <p class="text-xl text-gray-500 italic mb-10">
      A customizable and flexible fortune wheel made with vue3
    </p>

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
      :initial-items="items"
      :initial-first-item-index="firstItemIndex"
      @update-items="onSoftReset"
    />
    <WheelManager
      v-if="managerId === 2"
      :initial-settings="wheelSettings"
      @hard-reset="onHardReset"
    />
  </div>
</template>

<script>
import ItemsManager from "../components/ItemsManager.vue";
import WheelManager from "../components/WheelManager.vue";
import Roulette from "../../src/components/Roulette.vue";
import wheelData from "../data/homeData";

export default {
  name: "Home",

  components: {
    Roulette,
    ItemsManager,
    WheelManager
  },

  data () {
    return {
      ...wheelData,
      wheelActive: true,
      startAnim: false,
      managerId: 1,
      result: null
    }
  },

  mounted () {
    setTimeout(() =>{
      this.startAnim = true;
    }, 500)
  },

  methods: {
    launchWheel() {
      this.$refs.wheel.launchWheel();
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
      this.$refs.wheel.reset();
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

<style lang="scss">
.wheel-anim {
  transition: transform 4s cubic-bezier(.58,-0.26,.24,1.11);
  transform: rotate(-1800deg) scale(1.25);

  &-started {
    transform: rotate(0deg) scale(1);
  }
}

</style>