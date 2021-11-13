<template>
  <div>
    <strong>Item manager</strong>
    <table border="1">
      <tr>
        <th v-if="initialFirstItemIndex != null">First Item</th>
        <th>Name</th>
        <th>Html content</th>
        <th>Background</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(item, index) in items" :key="item.id">
        <td v-if="initialFirstItemIndex != null">
          <input
            name="firstItem"
            type="radio"
            :value="index"
            v-model="firstItemIndex.value"
          />
        </td>
        <td><input type="text" v-model="item.name" /></td>
        <td><textarea v-model="item.htmlContent" /></td>
        <td><input type="text" v-model="item.background" /></td>
        <td><button @click="remove(index)">X</button></td>
      </tr>
    </table>
    <div>
      <button @click="add">Add</button>
      <!-- <button @click="update">Update</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemsManager",
  emits: ["updateItems"],
  data() {
    return {
      firstItemIndex: null,
      items: [],
    };
  },
  props: {
    initialFirstItemIndex: {
      type: Object,
      required: false,
    },
    initialItems: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.items = this.initialItems;
    this.firstItemIndex = this.initialFirstItemIndex;
  },
  methods: {
    add() {
      const lastItem = this.items[this.items.length - 1];
      this.items.push({
        id: lastItem.id + 1,
        name: "",
        content: "",
        background: "",
      });
    },
    remove(index) {
      if (this.items.length < 5) {
        return;
      }
      this.items.splice(index, 1);
    },
    removeAll() {
      this.items = [];
    },
    update() {
      this.$emit("update-items", this.items);
    },
  },
};
</script>

<style lang="scss">
.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>