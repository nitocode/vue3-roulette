<template>
  <div class="flex flex-col lg:flex-row items-top justify-around">
    <div>
      <p class="text-xl mb-4">Wheel manager</p>
      
      <!-- DISPLAY SHADOW -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Shadow</span> 
          <input id="shadow" class="toggle toggle-primary" type="checkbox" v-model="settings.displayShadow" />
        </label>
      </div>
      <!-- DISPLAY BORDER -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Border</span> 
          <input id="border" class="toggle toggle-primary" type="checkbox" v-model="settings.displayBorder" />
        </label>
      </div>
      <!-- DISPLAY INDICATOR -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display Indicator</span> 
          <input id="indicator" class="toggle toggle-primary" type="checkbox" v-model="settings.displayIndicator" />
        </label>
      </div>
      <!-- CENTERED INDICATOR -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Centered indicator</span> 
          <input
            id="centered"
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="settings.centeredIndicator"
          />
        </label>
      </div>
      <!-- COUNTER CLOCKWISE -->
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Counter clockwise</span> 
          <input
            id="clock"
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="settings.counterClockwise"
          />
        </label>
      </div>
      <!-- CENTERED INDICATOR -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Horizontal content</span> 
          <input
            id="horizontal"
            type="checkbox"
            class="checkbox checkbox-primary"
            v-model="settings.horizontalContent"
          />
        </label>
      </div>
      <!-- SIZE -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Size</span>
        </label> 
        <label class="input-group input-group-md">
          <input id="size" class="input input-primary input-bordered input-md w-full" type="number" v-model="settings.size" />
          <span>px</span>
        </label>
      </div> 
      <!-- DURATION -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Duration</span>
        </label> 
        <label class="input-group input-group-md">
          <input id="duration" class="input input-primary input-bordered input-md w-full" type="number" v-model="settings.duration" />
          <span>&nbsp;s&nbsp;</span>
        </label>
      </div> 
      <!-- VARIATION -->      
      <div class="form-control">
        <label class="label">
          <span class="label-text">Variation</span>
        </label> 
        <label class="input-group input-group-md">
          <input id="variation" class="input input-primary input-bordered input-md w-full" type="number" v-model="settings.resultVariation" />
          <span>%&nbsp;</span>
        </label>

        <input type="range" max="100" v-model="settings.resultVariation" class="range range-primary mt-2"> 
      </div> 
      <!-- INDICATOR POSITION -->
      <div class="form-control w-full max-w-xs">
        <label for="position" class="label">
          <span class="label-text">Indicator position</span> 
        </label> 
        <select
          name="position"
          class="select select-bordered select-primary w-full max-w-xs"
          id="position"
          v-model="settings.indicatorPosition"
        >
          <option value="top">Top</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
        </select>
      </div>

      <!-- EASING -->
      <div class="form-control w-full max-w-xs">
        <label for="easing" class="label">
          <span class="label-text">Easing</span> 
        </label> 
        <select
          name="easing"
          class="select select-bordered select-primary w-full max-w-xs"
          id="easing"
          v-model="settings.easing"
        >
          <option value="ease">Ease</option>
          <option value="bounce">Bounce</option>
        </select>
      </div>
    </div>

    <div class="divider lg:divider-vertical"></div> 

    <div>
      <p class="text-xl mb-4">Wheel base manager</p>
      <!-- DISPLAY BASE -->      
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Display base</span> 
          <input id="base" class="toggle toggle-primary" type="checkbox" v-model="settings.baseDisplay" />
        </label>
      </div>
      <div :class="{'opacity-50': !settings.baseDisplay}">
        <!-- DISPLAY BASE SHADOW -->          
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Display base shadow</span> 
            <input id="baseShadow" class="toggle toggle-primary" type="checkbox" v-model="settings.baseDisplayShadow" />
          </label>
        </div>
        <!-- DISPLAY BASE INDICATOR -->
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Display base indicator</span> 
            <input id="baseIndicator" class="toggle toggle-primary" type="checkbox" v-model="settings.baseDisplayIndicator" />
          </label>
        </div>

        <!-- BASE SIZE -->      
        <div class="form-control">
          <label class="label">
            <span class="label-text">Base size</span>
          </label> 
          <label class="input-group input-group-md">
            <input id="baseSize" class="input input-primary input-bordered input-md w-full" type="number" v-model="settings.baseSize" />
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
            class="input input-primary input-bordered"
            type="text"
            v-model="settings.baseBackground"
          />
        </div> 
        <!-- BASE HTML CONTENT -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Base HTML Content</span>
          </label> 
          <textarea class="textarea h-24 textarea-bordered textarea-primary" v-model="settings.baseHtmlContent" />
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