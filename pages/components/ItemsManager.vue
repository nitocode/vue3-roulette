<template>
  <div>
    <table class="table w-full">
      <thead class="text-center">
        <tr>
          <th v-if="initialFirstItemIndex != null">First Item</th>
          <th>Name</th>
          <th>Html content</th>
          <th>Text color</th>
          <th>Background</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td v-if="initialFirstItemIndex != null">
            <input
              name="firstItem"
              class="block mx-auto radio radio-primary"
              type="radio"
              :value="index"
              v-model="firstItemIndex.value"
            />
          </td>
          <td><input class="input input-bordered w-full" type="text" v-model="item.name" /></td>
          <td><textarea class="textarea h-12 textarea-bordered textarea-primary w-full" v-model="item.htmlContent" /></td>
          <td><input class="input input-bordered w-full" type="text" v-model="item.textColor" /></td>
          <td><input class="input input-bordered w-full" type="text" v-model="item.background" /></td>
          <td class="text-center">
            <button class="btn btn-error btn-outline btn-circle btn-sm" @click="remove(index)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">   
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="text-center">
        <tr>
          <th v-if="initialFirstItemIndex != null">First Item</th>
          <th>Name</th>
          <th>Html content</th>
          <th>Text color</th>
          <th>Background</th>
          <th>Delete</th>
        </tr>
      </tfoot>
    </table>
    
    <div class="divider"></div> 

    <div>
      <button class="btn btn-primary" @click="add">Add Item</button>
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
        htmlContent: "",
        textColor: "",
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