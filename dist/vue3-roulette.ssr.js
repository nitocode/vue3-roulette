'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = {
  name: "Roulette",
  emits: ["wheelStart", "wheelEnd"],
  props: {
    items: {
      type: Object,
      required: true,
      validator: function validator(value) {
        return value.length >= 4;
      }
    },
    firstItemIndex: {
      type: Object,
      required: false,
      default: function _default() {
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
      validator: function validator(value) {
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
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    easing: {
      type: String,
      required: false,
      default: "ease",
      validator: function validator(value) {
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
  data: function data() {
    return {
      itemSelected: null,
      processingLock: false
    };
  },
  computed: {
    itemAngle: function itemAngle() {
      return 360 / this.items.length;
    },
    startingAngle: function startingAngle() {
      if (this.centeredIndicator) {
        return -1 * this.firstItemIndex.value * this.itemAngle - this.itemAngle / 2;
      } else {
        return -1 * this.firstItemIndex.value * this.itemAngle;
      }
    },
    degreesVariation: function degreesVariation() {
      if (!this.resultVariation) {
        return 0;
      }

      var minDegreesVariation = this.itemAngle / 2 * this.resultVariation / 100 * -1;
      var maxDegreesVariation = this.itemAngle / 2 * this.resultVariation / 100; // Return random value between min and max degrees variation

      return Number((Math.random() * (maxDegreesVariation - minDegreesVariation) + minDegreesVariation).toFixed(2));
    },
    counterClockWiseOperator: function counterClockWiseOperator() {
      return this.counterClockwise ? -1 : 1;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.reset();
    document.querySelector(".wheel").addEventListener("transitionend", function () {
      _this.processingLock = false;

      _this.$emit("wheel-end", _this.itemSelected);
    });
  },
  methods: {
    reset: function reset() {
      this.itemSelected = null;
      document.querySelector(".wheel").style.transform = "rotate(".concat(this.startingAngle, "deg)");
    },
    launchWheel: function launchWheel() {
      if (this.processingLock && this.itemSelected != null) {
        return;
      }

      this.processingLock = true;
      var wheelResult = Math.floor(Math.random() * this.items.length + 1);
      var wheelElt = document.querySelector(".wheel");
      console.log("wheelResult", wheelResult);
      this.itemSelected = this.items[wheelResult - 1];
      wheelElt.style.transform = "rotate(".concat(this.counterClockWiseOperator * (360 * 3) + -(wheelResult - 1) * this.itemAngle - this.itemAngle / 2 + this.degreesVariation, "deg)");
      this.$emit("wheel-start");
    }
  }
};var _hoisted_1 = {
  class: "wheel-base"
};
var _hoisted_2 = {
  key: 0,
  class: "wheel-base-indicator"
};
var _hoisted_3 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["wheel-container", ["indicator-".concat($props.indicatorPosition), {
      'wheel-container-indicator': $props.displayIndicator
    }, {
      'wheel-container-shadow': $props.displayShadow
    }, {
      'wheel-container-border': $props.displayBorder
    }]])
  }, [$props.baseDisplay ? (vue.openBlock(), vue.createElementBlock("div", {
    key: 0,
    class: vue.normalizeClass(["wheel-base-container", [{
      'wheel-base-container-shadow': $props.baseDisplayShadow
    }]]),
    style: vue.normalizeStyle({
      width: "".concat($props.baseSize, "px"),
      height: "".concat($props.baseSize, "px"),
      background: "".concat($props.baseBackground)
    })
  }, [vue.createElementVNode("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "baseContent")]), $props.baseDisplayIndicator ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2)) : vue.createCommentVNode("", true)], 6)) : vue.createCommentVNode("", true), vue.createElementVNode("div", {
    class: vue.normalizeClass(["wheel", ["easing-".concat($props.easing), {
      'wheel-border': $props.displayBorder
    }]]),
    style: vue.normalizeStyle({
      width: "".concat($props.size, "px"),
      height: "".concat($props.size, "px"),
      transitionDuration: "".concat($props.duration, "s"),
      transform: "rotate(".concat(this.startingAngle, "deg)")
    })
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.items, function (item, index) {
    return vue.openBlock(), vue.createElementBlock("div", {
      key: item.id,
      class: "wheel-item",
      style: vue.normalizeStyle({
        transform: "rotate(".concat($options.itemAngle * index, "deg) skewY(").concat(-(90 - $options.itemAngle), "deg)")
      })
    }, [vue.createElementVNode("div", {
      class: vue.normalizeClass(["content", {
        'horizontal-content': $props.horizontalContent
      }]),
      style: vue.normalizeStyle({
        transform: "skewY(".concat(90 - $options.itemAngle, "deg) rotate(").concat($options.itemAngle / 2, "deg)"),
        background: item.background
      })
    }, [vue.createElementVNode("span", {
      innerHTML: item.htmlContent
    }, null, 8, _hoisted_3)], 6)], 4);
  }), 128))], 6)], 2);
}function styleInject(css, ref) {
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
}var css_248z = ".wheel-container,\n.wheel-base,\n.wheel-base-container,\n.wheel-base-indicator {\n  transition: transform 1s ease-in-out; }\n\n.wheel-container {\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  border-radius: 50%;\n  cursor: pointer; }\n  .wheel-container-indicator:before {\n    content: \"\";\n    position: absolute;\n    z-index: 4;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-top: 20px solid black;\n    transform: translateX(-50%); }\n  .wheel-container.indicator-top {\n    transform: rotate(0deg); }\n  .wheel-container.indicator-right {\n    transform: rotate(90deg); }\n    .wheel-container.indicator-right .wheel-base {\n      transform: rotate(-90deg); }\n  .wheel-container.indicator-bottom {\n    transform: rotate(180deg); }\n    .wheel-container.indicator-bottom .wheel-base {\n      transform: rotate(-180deg); }\n  .wheel-container.indicator-left {\n    transform: rotate(270deg); }\n    .wheel-container.indicator-left .wheel-base {\n      transform: rotate(-270deg); }\n  .wheel-container-border {\n    border: 8px solid black; }\n  .wheel-container-shadow {\n    box-shadow: 5px 5px 15px -5px #000000; }\n\n.wheel-base-container {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  left: 50%;\n  border-radius: 50%;\n  border: 5px solid black;\n  transform: translate(-50%, -50%); }\n  .wheel-base-container-shadow {\n    box-shadow: 5px 5px 15px -5px #000000; }\n  .wheel-base-container .wheel-base {\n    position: absolute;\n    z-index: 2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n    width: 100%;\n    height: 100%; }\n  .wheel-base-container .wheel-base-indicator {\n    position: absolute;\n    z-index: 1;\n    width: 100%;\n    height: 100%; }\n  .wheel-base-container .wheel-base-indicator:before {\n    content: \"\";\n    position: absolute;\n    z-index: 1;\n    top: -20px;\n    width: 0;\n    height: 0;\n    border-left: 20px solid transparent;\n    border-right: 20px solid transparent;\n    border-bottom: 20px solid black;\n    transform: translateX(-50%); }\n\n.wheel {\n  background: white;\n  border-radius: 50%;\n  margin: auto;\n  overflow: hidden; }\n  .wheel.easing-ease {\n    transition: transform cubic-bezier(0.65, 0, 0.35, 1); }\n  .wheel.easing-bounce {\n    transition: transform cubic-bezier(0.49, 0.02, 0.52, 1.12); }\n  .wheel-border:after {\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 3;\n    border-radius: 50%;\n    background-image: linear-gradient(to left, black 33%, rgba(255, 255, 255, 0) 0%);\n    background-position: bottom;\n    background-size: 3px 1px;\n    /* background:linear-gradient(red,purple,orange); */\n    -webkit-mask: radial-gradient(transparent 65%, #000 66%);\n    mask: radial-gradient(transparent 65%, #000 66%); }\n  .wheel-item {\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 50%;\n    height: 50%;\n    transform-origin: 0% 100%;\n    border: 1px solid black; }\n  .wheel-item:nth-child(odd) {\n    background-color: skyblue; }\n  .wheel-item:nth-child(even) {\n    background-color: pink; }\n  .wheel .content {\n    position: absolute;\n    left: -100%;\n    width: 195%;\n    height: 195%;\n    text-align: center;\n    transform: skewY(30deg) rotate(0deg);\n    padding-top: 20px; }\n    .wheel .content.horizontal-content {\n      left: initial;\n      right: 100%;\n      width: 60%;\n      height: 250%;\n      text-align: right; }\n      .wheel .content.horizontal-content span {\n        display: block;\n        transform: rotate(270deg); }\n";
styleInject(css_248z);script.render = render;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,Roulette:script});var install = function installVue3Roulette(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,Roulette:script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;