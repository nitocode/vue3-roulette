export default {
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