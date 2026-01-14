<template>
  <div>Items</div>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="item Name" id="name" v-model="cDetails.username" required/>
    <input type="number" placeholder="Enter Price" id="price" v-model="cDetails.discount" required min="0" max="100" />
    <input type="submit" value="submit" />
  </form>
   {{customers}}
</template>

<script>
import { getItemsOrCutomers, addItemsOrCutomers } from "../services/service";
export default {
  name: "home",
  data() {
    return {
      customers: [],
       cDetails:{
        username:"",
        discount:""
      },
      type:'customer'
    };
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      try {
        const repsonse = await getItemsOrCutomers(this.type);
        this.customers = repsonse.data;
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit() {
      try {
        const res = await addItemsOrCutomers(this.type, this.cDetails);
        if(res.status == 200){
            this.getCustomers()
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
