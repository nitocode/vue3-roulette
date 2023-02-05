<template>
  <div class="flex flex-col lg:flex-row items-top justify-around">
    <div>
      <p class="text-xl mb-4">
        Wheel manager
      </p>
      
      <!-- DISPLAY SHADOW -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Shadow</span> 
          <input
            id="shadow"
            v-model="settings.displayShadow"
            class="toggle toggle-primary"
            type="checkbox"
          >
        </label>
      </div>
      <!-- DISPLAY BORDER -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Border</span> 
          <input
            id="border"
            v-model="settings.displayBorder"
            class="toggle toggle-primary"
            type="checkbox"
          >
        </label>
      </div>
      <!-- DISPLAY INDICATOR -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Indicator</span> 
          <input
            id="indicator"
            v-model="settings.displayIndicator"
            class="toggle toggle-primary"
            type="checkbox"
          >
        </label>
      </div>
      <!-- CENTERED INDICATOR -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Centered indicator</span> 
          <input
            id="centered"
            v-model="settings.centeredIndicator"
            type="checkbox"
            class="checkbox checkbox-primary"
          >
        </label>
      </div>
      <!-- COUNTER CLOCKWISE -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Counter clockwise</span> 
          <input
            id="clock"
            v-model="settings.counterClockwise"
            type="checkbox"
            class="checkbox checkbox-primary"
          >
        </label>
      </div>
      <!-- CENTERED INDICATOR -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Horizontal content</span> 
          <input
            id="horizontal"
            v-model="settings.horizontalContent"
            type="checkbox"
            class="checkbox checkbox-primary"
          >
        </label>
      </div>
      <!-- SIZE -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Size</span>
        </label> 
        <label class="input-group input-group-md">
          <input
            id="size"
            v-model="settings.size"
            class="input input-primary input-bordered input-md w-full"
            type="number"
          >
          <span>px</span>
        </label>
      </div> 
      <!-- DURATION -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Duration</span>
        </label> 
        <label class="input-group input-group-md">
          <input
            id="duration"
            v-model="settings.duration"
            class="input input-primary input-bordered input-md w-full"
            type="number"
          >
          <span>&nbsp;s&nbsp;</span>
        </label>
      </div> 
      <!-- VARIATION -->      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Variation</span>
        </label> 
        <label class="input-group input-group-md">
          <input
            id="variation"
            v-model="settings.resultVariation"
            class="input input-primary input-bordered input-md w-full"
            type="number"
          >
          <span>%&nbsp;</span>
        </label>

        <input
          v-model="settings.resultVariation"
          type="range"
          max="100"
          class="range range-primary mt-2"
        > 
      </div> 
      <!-- INDICATOR POSITION -->
      <div class="form-control w-full max-w-xs">
        <label
          for="position"
          class="label"
        >
          <span class="label-text">Indicator position</span> 
        </label> 
        <select
          id="position"
          v-model="settings.indicatorPosition"
          name="position"
          class="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="top">
            Top
          </option>
          <option value="right">
            Right
          </option>
          <option value="bottom">
            Bottom
          </option>
          <option value="left">
            Left
          </option>
        </select>
      </div>

      <!-- EASING -->
      <div class="form-control w-full max-w-xs">
        <label
          for="easing"
          class="label"
        >
          <span class="label-text">Easing</span> 
        </label> 
        <select
          id="easing"
          v-model="settings.easing"
          name="easing"
          class="select select-bordered select-primary w-full max-w-xs"
        >
          <option value="ease">
            Ease
          </option>
          <option value="bounce">
            Bounce
          </option>
        </select>
      </div>
    </div>

    <div class="divider lg:divider-vertical" /> 

    <div>
      <p class="text-xl mb-4">
        Wheel base manager
      </p>
      <!-- DISPLAY BASE -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display base</span> 
          <input
            id="base"
            v-model="settings.baseDisplay"
            class="toggle toggle-primary"
            type="checkbox"
          >
        </label>
      </div>
      <div :class="{'opacity-50': !settings.baseDisplay}">
        <!-- DISPLAY BASE SHADOW -->          
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Display base shadow</span> 
            <input
              id="baseShadow"
              v-model="settings.baseDisplayShadow"
              class="toggle toggle-primary"
              type="checkbox"
            >
          </label>
        </div>
        <!-- DISPLAY BASE INDICATOR -->
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Display base indicator</span> 
            <input
              id="baseIndicator"
              v-model="settings.baseDisplayIndicator"
              class="toggle toggle-primary"
              type="checkbox"
            >
          </label>
        </div>

        <!-- BASE SIZE -->      
        <div class="form-control">
          <label class="label">
            <span class="label-text">Base size</span>
          </label> 
          <label class="input-group input-group-md">
            <input
              id="baseSize"
              v-model="settings.baseSize"
              class="input input-primary input-bordered input-md w-full"
              type="number"
            >
            <span>px</span>
          </label>
        </div> 
        <!-- BASE BACKGROUND -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Base background</span>
          </label> 
          <input
            id="baseBackground"
            v-model="settings.baseBackground"
            class="input input-primary input-bordered"
            type="text"
          >
        </div> 
        <!-- BASE HTML CONTENT -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Base HTML Content</span>
          </label> 
          <textarea
            v-model="settings.baseHtmlContent"
            class="textarea h-24 textarea-bordered textarea-primary"
          />
        </div> 
      </div>
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