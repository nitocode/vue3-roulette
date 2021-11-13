<template>
  <div>
    <strong>Wheel manager</strong>
    <!-- CENTERED INDICATOR -->
    <div>
      <label for="centered">Centered indicator</label>
      <input
        id="centered"
        type="checkbox"
        v-model="settings.centeredIndicator"
      />
    </div>
    <!-- COUNTER CLOCKWISE -->
    <div>
      <label for="clock">Counter clockwise</label>
      <input id="clock" type="checkbox" v-model="settings.counterClockwise" />
    </div>
    <!-- CENTERED INDICATOR -->
    <div>
      <label for="horizontal">Horizontal content</label>
      <input
        id="horizontal"
        type="checkbox"
        v-model="settings.horizontalContent"
      />
    </div>
    <!-- DISPLAY SHADOW -->
    <div>
      <label for="shadow">Display Shadow</label>
      <input id="shadow" type="checkbox" v-model="settings.displayShadow" />
    </div>
    <!-- DISPLAY BORDER -->
    <div>
      <label for="border">Display Border</label>
      <input id="border" type="checkbox" v-model="settings.displayBorder" />
    </div>
    <!-- DISPLAY INDICATOR -->
    <div>
      <label for="indicator">Display Indicator</label>
      <input
        id="indicator"
        type="checkbox"
        v-model="settings.displayIndicator"
      />
    </div>
    <!-- INDICATOR POSITION -->
    <div>
      <label for="position">Indicator position</label>
      <select
        name="position"
        id="position"
        v-model="settings.indicatorPosition"
      >
        <option value="top">Top</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
      </select>
    </div>
    <!-- SIZE -->
    <div>
      <label for="size">Size</label>
      <input id="size" type="number" v-model="settings.size" />
    </div>
    <!-- DURATION -->
    <div>
      <label for="duration">Duration</label>
      <input type="number" v-model="settings.duration" />
    </div>
    <!-- VARIATION -->
    <div>
      <label for="variation">Variation</label>
      <input type="number" v-model="settings.resultVariation" />
    </div>

    <!-- EASING -->
    <div>
      <label for="easing">Easing</label>
      <select name="easing" id="easing" v-model="settings.easing">
        <option value="ease">Ease</option>
        <option value="bounce">Bounce</option>
      </select>
    </div>

    <strong>Wheel base manager</strong>
    <!-- DISPLAY BASE -->
    <div>
      <label for="base">Display base</label>
      <input id="base" type="checkbox" v-model="settings.baseDisplay" />
    </div>

    <!-- BASE SIZE -->
    <div>
      <label for="baseSize">Base size</label>
      <input id="baseSize" type="number" v-model="settings.baseSize" />
    </div>
    <!-- DISPLAY BASE SHADOW -->
    <div>
      <label for="baseShadow">Display base shadow</label>
      <input
        id="baseShadow"
        type="checkbox"
        v-model="settings.baseDisplayShadow"
      />
    </div>
    <!-- DISPLAY BASE INDICATOR -->
    <div>
      <label for="baseIndicator">Display base indicator</label>
      <input
        id="baseIndicator"
        type="checkbox"
        v-model="settings.baseDisplayIndicator"
      />
    </div>
    <!-- BASE BACKGROUND -->
    <div>
      <label for="baseBackground">Base background</label>
      <input
        id="baseBackground"
        type="text"
        v-model="settings.baseBackground"
      />
    </div>
    <!-- BASE HTML CONTENT -->
    <div>
      <label for="baseHtmlContent">Base HTML Content</label>
      <textarea v-model="settings.baseHtmlContent" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WheelManager",
  props: {
    initialSettings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      settings: {},
    };
  },
  mounted() {
    this.settings = this.initialSettings;
  },
};
</script>

<style lang="scss">
</style>