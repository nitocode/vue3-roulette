<template>
  <div
    :id="`wheel-container-${randomIdRoulette}`"
    class="wheel-container"
    :class="[
      `indicator-${indicatorPosition}`,
      { 'wheel-container-indicator': displayIndicator },
      { 'wheel-container-shadow': displayShadow },
      { 'wheel-container-border': displayBorder },
    ]"
  >
    <!-- BASE WHEEL -->
    <div
      v-if="baseDisplay"
      class="wheel-base-container"
      :class="[{ 'wheel-base-container-shadow': baseDisplayShadow }]"
      :style="{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        background: `${baseBackground}`,
      }"
    >
      <div class="wheel-base">
        <slot name="baseContent"></slot>
      </div>
      <div v-if="baseDisplayIndicator" class="wheel-base-indicator"></div>
    </div>
    <!-- WHEEL -->
    <div
      class="wheel"
      :class="[`easing-${easing}`, { 'wheel-border': displayBorder }]"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        transitionDuration: `${duration}s`,
        transform: `rotate(${this.startingAngle}deg)`,
      }"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="wheel-item"
        :style="{
          transform: `rotate(${itemAngle * index}deg) skewY(${-(
            90 - itemAngle
          )}deg)`,
          background: item.background,
        }"
      >
        <div
          class="content"
          :class="{ 'horizontal-content': horizontalContent }"
          :style="{
            transform: `skewY(${90 - itemAngle}deg) rotate(${
              itemAngle / 2
            }deg)`,
          }"
        >
          <span v-html="item.htmlContent" :style="{ color: item.textColor }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent ({
  name: "Roulette",
  emits: ["wheelStart", "wheelEnd"],
  props: {
    items: {
      type: Object,
      required: true,
      validator(value) {
        return value.length >= 4;
      },
    },
    firstItemIndex: {
      type: Object,
      required: false,
      default() {
        return { value: 0 };
      },
    },
    centeredIndicator: {
      type: Boolean,
      required: false,
      default: false,
    },
    indicatorPosition: {
      type: String,
      required: false,
      default: "top",
      validator(value) {
        return ["top", "right", "bottom", "left"].includes(value);
      },
    },
    size: {
      type: Number,
      required: false,
      default: 300,
    },
    displayShadow: {
      type: Boolean,
      required: false,
      default: false,
    },
    duration: {
      type: Number,
      required: false,
      default: 4,
    },
    resultVariation: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 100;
      },
    },
    easing: {
      type: String,
      required: false,
      default: "ease",
      validator(value) {
        return ["ease", "bounce"].includes(value);
      },
    },
    counterClockwise: {
      type: Boolean,
      required: false,
      default: false,
    },
    horizontalContent: {
      type: Boolean,
      required: false,
      default: false,
    },
    displayBorder: {
      type: Boolean,
      required: false,
      default: false,
    },
    displayIndicator: {
      type: Boolean,
      required: false,
      default: true,
    },
    baseDisplay: {
      type: Boolean,
      required: false,
      default: false,
    },
    baseSize: {
      type: Number,
      required: false,
      default: 100,
    },
    baseDisplayShadow: {
      type: Boolean,
      required: false,
      default: false,
    },
    baseDisplayIndicator: {
      type: Boolean,
      required: false,
      default: false,
    },

    baseBackground: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      randomIdRoulette: 0,
      itemSelected: null,
      processingLock: false,
    };
  },
  computed: {
    itemAngle: function () {
      return 360 / this.items.length;
    },
    startingAngle: function () {
      if (this.centeredIndicator) {
        return (
          -1 * this.firstItemIndex.value * this.itemAngle - this.itemAngle / 2
        );
      } else {
        return -1 * this.firstItemIndex.value * this.itemAngle;
      }
    },
    degreesVariation: function () {
      if (!this.resultVariation) {
        return 0;
      }
      const minDegreesVariation =
        (((this.itemAngle / 2) * this.resultVariation) / 100) * -1;
      const maxDegreesVariation =
        ((this.itemAngle / 2) * this.resultVariation) / 100;
      // Return random value between min and max degrees variation
      return Number(
        (
          Math.random() * (maxDegreesVariation - minDegreesVariation) +
          minDegreesVariation
        ).toFixed(2)
      );
    },
    counterClockWiseOperator: function () {
      return this.counterClockwise ? -1 : 1;
    },
  },
  mounted() {
    this.randomIdRoulette = Number((Math.random() * (999999 - 1) +1).toFixed(0));
    this.$nextTick(() => {
      this.reset();
      document.querySelector(`#wheel-container-${this.randomIdRoulette} .wheel`).addEventListener("transitionend", () => {
        this.processingLock = false;
        this.$emit("wheel-end", this.itemSelected);
      });
    })
  },
  methods: {
    reset() {
      this.itemSelected = null;
      document.querySelector(
        `#wheel-container-${this.randomIdRoulette} .wheel`
      ).style.transform = `rotate(${this.startingAngle}deg)`;
    },
    launchWheel() {
      if (this.processingLock && this.itemSelected != null) {
        return;
      }
      this.processingLock = true;
      const wheelResult = Math.floor(Math.random() * this.items.length + 1);
      const wheelElt = document.querySelector(`#wheel-container-${this.randomIdRoulette} .wheel`);

      this.itemSelected = this.items[wheelResult - 1];

      wheelElt.style.transform = `rotate(${
        this.counterClockWiseOperator * (360 * 3) +
        -(wheelResult - 1) * this.itemAngle -
        this.itemAngle / 2 +
        this.degreesVariation
      }deg)`;
      this.$emit("wheel-start");
    },
  },
});
</script>

<style lang="scss" scoped>
.wheel-container,
.wheel-base,
.wheel-base-container,
.wheel-base-indicator {
  transition: transform 1s ease-in-out;
}
.wheel-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;

  &-indicator:before {
    content: "";
    position: absolute;
    z-index: 4;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid black;
    transform: translateX(-50%);
  }

  &.indicator-top {
    transform: rotate(0deg);
  }
  &.indicator-right {
    transform: rotate(90deg);
    .wheel-base {
      transform: rotate(-90deg);
    }
  }
  &.indicator-bottom {
    transform: rotate(180deg);
    .wheel-base {
      transform: rotate(-180deg);
    }
  }
  &.indicator-left {
    transform: rotate(270deg);
    .wheel-base {
      transform: rotate(-270deg);
    }
  }

  &-border {
    border: 8px solid black;
  }

  &-shadow {
    box-shadow: 5px 5px 15px -5px #000000;
  }
}
.wheel-base-container {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 5px solid black;
  transform: translate(-50%, -50%);

  &-shadow {
    box-shadow: 5px 5px 15px -5px #000000;
  }

  .wheel-base {
    position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .wheel-base-indicator {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .wheel-base-indicator:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid black;
    transform: translateX(-50%);
  }
}

.wheel {
  background: white;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;

  &.easing-ease {
    transition: transform cubic-bezier(0.65, 0, 0.35, 1);
  }
  &.easing-bounce {
    transition: transform cubic-bezier(0.49, 0.02, 0.52, 1.12);
  }

  &-border:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    border-radius: 50%;
    background-image: linear-gradient(
      to left,
      black 33%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: bottom;
    background-size: 3px 1px;
    /* background:linear-gradient(red,purple,orange); */
    -webkit-mask: radial-gradient(transparent 65%, #000 66%);
    mask: radial-gradient(transparent 65%, #000 66%);
  }

  &-item {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
    border: 1px solid black;
  }
  &-item:nth-child(odd) {
    background-color: skyblue;
  }
  &-item:nth-child(even) {
    background-color: pink;
  }

  .content {
    position: absolute;
    left: -100%;
    width: 200%;
    height: 200%;
    text-align: center;
    transform: skewY(30deg) rotate(0deg);
    padding-top: 20px;

    &.horizontal-content {
      left: initial;
      right: 100%;
      width: 50%;
      height: 250%;
      text-align: right;
      span {
        display: block;
        transform: rotate(270deg);
      }
    }
  }
}
</style>