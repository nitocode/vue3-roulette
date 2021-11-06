import { openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createCommentVNode, Fragment, renderList } from 'vue';

var script = {
  name: "FortuneWheel",
  emits: ["wheelStart", "wheelEnd"],
  props: {
    items: {
      type: Object,
      required: true,

      validator(value) {
        return value.length >= 4;
      }

    },
    firstItemIndex: {
      type: Object,
      required: false,

      default() {
        return {
          value: 0
        };
      }

    },
    centeredIndicator: {
      type: Boolean,
      required: false,
      default: false
    },
    indicatorPosition: {
      type: String,
      required: false,
      default: "top",

      validator(value) {
        return ["top", "right", "bottom", "left"].includes(value);
      }

    },
    size: {
      type: Number,
      required: false,
      default: 300
    },
    displayShadow: {
      type: Boolean,
      required: false,
      default: false
    },
    duration: {
      type: Number,
      required: false,
      default: 4
    },
    resultVariation: {
      type: Number,
      required: false,
      default: 0,

      validator(value) {
        return value >= 0 && value <= 100;
      }

    },
    easing: {
      type: String,
      required: false,
      default: "ease",

      validator(value) {
        return ["ease", "bounce"].includes(value);
      }

    },
    counterClockwise: {
      type: Boolean,
      required: false,
      default: false
    },
    horizontalContent: {
      type: Boolean,
      required: false,
      default: false
    },
    displayBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    displayIndicator: {
      type: Boolean,
      required: false,
      default: true
    },
    baseDisplay: {
      type: Boolean,
      required: false,
      default: false
    },
    baseSize: {
      type: Number,
      required: false,
      default: 100
    },
    baseDisplayShadow: {
      type: Boolean,
      required: false,
      default: false
    },
    baseDisplayIndicator: {
      type: Boolean,
      required: false,
      default: false
    },
    baseBackground: {
      type: String,
      required: false,
      default: ""
    }
  },

  data() {
    return {
      itemSelected: null,
      processingLock: false
    };
  },

  computed: {
    itemAngle: function () {
      return 360 / this.items.length;
    },
    startingAngle: function () {
      if (this.centeredIndicator) {
        return -1 * this.firstItemIndex.value * this.itemAngle - this.itemAngle / 2;
      } else {
        return -1 * this.firstItemIndex.value * this.itemAngle;
      }
    },
    degreesVariation: function () {
      if (!this.resultVariation) {
        return 0;
      }

      const minDegreesVariation = this.itemAngle / 2 * this.resultVariation / 100 * -1;
      const maxDegreesVariation = this.itemAngle / 2 * this.resultVariation / 100; // Return random value between min and max degrees variation

      return Number((Math.random() * (maxDegreesVariation - minDegreesVariation) + minDegreesVariation).toFixed(2));
    },
    counterClockWiseOperator: function () {
      return this.counterClockwise ? -1 : 1;
    }
  },

  mounted() {
    this.reset();
    document.querySelector(".wheel").addEventListener("transitionend", () => {
      this.processingLock = false;
      this.$emit("wheel-end", this.itemSelected);
    });
  },

  methods: {
    reset() {
      this.itemSelected = null;
      document.querySelector(".wheel").style.transform = `rotate(${this.startingAngle}deg)`;
    },

    launchWheel() {
      if (this.processingLock && this.itemSelected != null) {
        return;
      }

      this.processingLock = true;
      const wheelResult = Math.floor(Math.random() * this.items.length + 1);
      const wheelElt = document.querySelector(".wheel");
      console.log("wheelResult", wheelResult);
      this.itemSelected = this.items[wheelResult - 1];
      wheelElt.style.transform = `rotate(${this.counterClockWiseOperator * (360 * 3) + -(wheelResult - 1) * this.itemAngle - this.itemAngle / 2 + this.degreesVariation}deg)`;
      this.$emit("wheel-start");
    }

  }
};

const _hoisted_1 = {
  class: "wheel-base"
};
const _hoisted_2 = {
  key: 0,
  class: "wheel-base-indicator"
};
const _hoisted_3 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["wheel-container", [`indicator-${$props.indicatorPosition}`, {
      'wheel-container-indicator': $props.displayIndicator
    }, {
      'wheel-container-shadow': $props.displayShadow
    }, {
      'wheel-container-border': $props.displayBorder
    }]])
  }, [$props.baseDisplay ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass(["wheel-base-container", [{
      'wheel-base-container-shadow': $props.baseDisplayShadow
    }]]),
    style: normalizeStyle({
      width: `${$props.baseSize}px`,
      height: `${$props.baseSize}px`,
      background: `${$props.baseBackground}`
    })
  }, [createElementVNode("div", _hoisted_1, [renderSlot(_ctx.$slots, "baseContent")]), $props.baseDisplayIndicator ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true)], 6)) : createCommentVNode("", true), createElementVNode("div", {
    class: normalizeClass(["wheel", [`easing-${$props.easing}`, {
      'wheel-border': $props.displayBorder
    }]]),
    style: normalizeStyle({
      width: `${$props.size}px`,
      height: `${$props.size}px`,
      transitionDuration: `${$props.duration}s`,
      transform: `rotate(${this.startingAngle}deg)`
    })
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, index) => {
    return openBlock(), createElementBlock("div", {
      key: item.id,
      class: "wheel-item",
      style: normalizeStyle({
        transform: `rotate(${$options.itemAngle * index}deg) skewY(${-(90 - $options.itemAngle)}deg)`
      })
    }, [createElementVNode("div", {
      class: normalizeClass(["content", {
        'horizontal-content': $props.horizontalContent
      }]),
      style: normalizeStyle({
        transform: `skewY(${90 - $options.itemAngle}deg) rotate(${$options.itemAngle / 2}deg)`,
        background: item.background
      })
    }, [createElementVNode("span", {
      innerHTML: item.htmlContent
    }, null, 8, _hoisted_3)], 6)], 4);
  }), 128))], 6)], 2);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".wheel-container,\n.wheel-base,\n.wheel-base-container,\n.wheel-base-indicator {\n  transition: transform 1s ease-in-out; }\n\n.wheel-container {\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  border-radius: 50%;\n  cursor: pointer; }\n  .wheel-container-indicator:before {\n    content: \"\";\n    position: absolute;\n    z-index: 4;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-top: 20px solid black;\n    transform: translateX(-50%); }\n  .wheel-container.indicator-top {\n    transform: rotate(0deg); }\n  .wheel-container.indicator-right {\n    transform: rotate(90deg); }\n    .wheel-container.indicator-right .wheel-base {\n      transform: rotate(-90deg); }\n  .wheel-container.indicator-bottom {\n    transform: rotate(180deg); }\n    .wheel-container.indicator-bottom .wheel-base {\n      transform: rotate(-180deg); }\n  .wheel-container.indicator-left {\n    transform: rotate(270deg); }\n    .wheel-container.indicator-left .wheel-base {\n      transform: rotate(-270deg); }\n  .wheel-container-border {\n    border: 8px solid black; }\n  .wheel-container-shadow {\n    box-shadow: 5px 5px 15px -5px #000000; }\n\n.wheel-base-container {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  border-radius: 50%;\n  border: 5px solid black;\n  transform: translate(-50%, -50%); }\n  .wheel-base-container-shadow {\n    box-shadow: 5px 5px 15px -5px #000000; }\n  .wheel-base-container .wheel-base {\n    position: absolute;\n    z-index: 2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    width: 100%;\n    height: 100%; }\n  .wheel-base-container .wheel-base-indicator {\n    position: absolute;\n    z-index: 1;\n    width: 100%;\n    height: 100%; }\n  .wheel-base-container .wheel-base-indicator:before {\n    content: \"\";\n    position: absolute;\n    z-index: 1;\n    top: -20px;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 20px solid black;\n    transform: translateX(-50%); }\n\n.wheel {\n  background: white;\n  border-radius: 50%;\n  margin: auto;\n  overflow: hidden; }\n  .wheel.easing-ease {\n    transition: transform cubic-bezier(0.65, 0, 0.35, 1); }\n  .wheel.easing-bounce {\n    transition: transform cubic-bezier(0.49, 0.02, 0.52, 1.12); }\n  .wheel-border:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 3;\n    border-radius: 50%;\n    background-image: linear-gradient(to left, black 33%, rgba(255, 255, 255, 0) 0%);\n    background-position: bottom;\n    background-size: 3px 1px;\n    /* background:linear-gradient(red,purple,orange); */\n    -webkit-mask: radial-gradient(transparent 65%, #000 66%);\n    mask: radial-gradient(transparent 65%, #000 66%); }\n  .wheel-item {\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 50%;\n    height: 50%;\n    transform-origin: 0% 100%;\n    border: 1px solid black; }\n  .wheel-item:nth-child(odd) {\n    background-color: skyblue; }\n  .wheel-item:nth-child(even) {\n    background-color: pink; }\n  .wheel .content {\n    position: absolute;\n    left: -100%;\n    width: 195%;\n    height: 195%;\n    text-align: center;\n    transform: skewY(30deg) rotate(0deg);\n    padding-top: 20px; }\n    .wheel .content.horizontal-content {\n      left: initial;\n      right: 100%;\n      width: 60%;\n      height: 250%;\n      text-align: right; }\n      .wheel .content.horizontal-content span {\n        display: block;\n        transform: rotate(270deg); }\n";
styleInject(css_248z);

script.render = render;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FortuneWheel: script
});

// Import vue components

const install = function installVue3FortuneWheel(app) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export { script as FortuneWheel, install as default };
