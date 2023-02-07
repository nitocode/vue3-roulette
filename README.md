# Vue3 Roulette

> A customizable and flexible fortune wheel for vue3

## Demo

https://roulette.nitocode.com/

See also: [codesandbox template](https://codesandbox.io/s/vue3-roulette-c8tml)

## Installation

### Using npm

`npm i --save vue3-roulette`

## Usage

#### main.js
```js
import { createApp } from 'vue'
import App from './App.vue'
import { Roulette } from 'vue3-roulette'

createApp(App).component("roulette", Roulette).mount('#app')
```

#### vuejs html template
```html
<Roulette ref="wheel" :items="items" @click="launchWheel" />
```

#### vuejs script 

Using the [sfc syntax](https://v3.vuejs.org/api/sfc-script-setup.html)
```html 
<script setup>
import { ref } from 'vue'
const wheel = ref(null);
const items = [
  { id: 1, name: "Banana", htmlContent: "Banana", textColor: "", background: "" },
  { id: 2, name: "Apple", htmlContent: "Apple", textColor: "", background: "" },
  { id: 3, name: "Orange and Purple", htmlContent: "Orange<br>and Purple", textColor: "", background: "" },
  { id: 4, name: "Cherry", htmlContent: "Cherry", textColor: "", background: "" },
];

function launchWheel (){
  wheel.value.launchWheel();
}
</script>
```

## Events API 

`wheel-start` and `wheel-end` which provide the item selected

```html
<Roulette 
  ref="wheel" :items="items" @click="launchWheel" 
  @wheel-start="wheelStartedCallback"
  @wheel-end="wheelEndedCallback"
/>
```

## Methods API

Composition API
```javascript
wheel.value.launchWheel();
wheel.value.reset();
```
Option API
```javascript
this.$refs.wheel.launchWheel();
this.$refs.wheel.reset();
```

## Props API (Wheel)

| Props      | Type       | Required | Default    | Options        | Details |
|------------|------------|----------|------------|----------------|--|
| items    | Object | yes     | -          |               | 4 items minimum |
| first-item-index      | Object     | no    | { value: 0 } |               |
| wheel-result-index      | Object     | no    | { value: null } | from 0 to items length      |
| centered-indicator      | Boolean     | no    | false |               |
| indicator-position       | String     | no       | "top"       | "top" \| "right" \| "bottom" \| "left" |
| size | Number   | no       | 300      |                | size unit: pixel |
| display-shadow | Boolean   | no       | false      |                |
| duration       | Number       | no       | 4   | | duration unit: seconds       |                |
| result-variation | Number    | no       | 0 | number between 0 and 100 | varies the result angle to fake wheel smoothness |
| easing | String    | no       | "ease"      | "ease" \| "bounce"        | wheel animation |
| counter-clockwise                   | Boolean      | no       | false  | | rotation direction
| horizontal-content | Boolean    | no       | false      |                | text item orientation
| display-border | Boolean    | no       | false      |                |
| display-indicator | Boolean    | no       | false      |                |

## Props API (Wheel base)

| Props      | Type       | Required | Default    | Options        | Details |
|------------|------------|----------|------------|----------------|--|
| base-display    | Boolean | no     | false          |               |  |
| base-size    | Number | no     | 100          |               | size unit: pixel |
| base-display-shadow    | Boolean | no     | false          |               |  |
| base-display-indicator    | Boolean | no     | false          |               |  |
| base-background    | String | no     | ""          | rgb(100,0,0) \| red \| #FF0000              |  |


## Slots

You can use your own html for the wheel base

```html
<Roulette ref="wheel" :items="items" @click="launchWheel">
  <template #baseContent>
    <div v-html="yourHtml"></div>
  </template>
</Roulette>
```

## Contribution

### Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```
