<template>
  <div>Items</div>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="item Name" id="name" v-model="itemDetails.name" required/>
    <input type="number" placeholder="Enter Price" id="price" v-model="itemDetails.price" required />
    <input type="submit" value="submit" />
  </form>
   {{items}}
   <RouterLink to="/customers">Cutomerss</RouterLink>
</template>

<script>
import { getItemsOrCutomers, addItemsOrCutomers } from "../services/service";
export default {
  name: "home",
  data() {
    return {
      items: [],
      itemDetails:{
        name:"",
        price:""
      }
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const repsonse = await getItemsOrCutomers('items');
        this.items = repsonse.data;
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit() {
      try {
        const res = await addItemsOrCutomers('items', this.itemDetails);
        console.log(res);
        if(res.status == 200){
            this.getItems()
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
