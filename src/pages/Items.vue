<template>
  <div class="row justify-content-start">
    <div class="col-md-10">

      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 class="fw-bold text-dark">Items Management</h2>
        <span class="badge bg-primary rounded-pill fs-6">{{ products.length }} items</span>
      </div>

      <div class="card shadow-sm border-0 mb-5">
        <div class="card-header bg-transparent border-0 pt-4 px-4 pb-0">
          <h5 class="card-title fw-bold text-secondary">Add New Item</h5>
        </div>
        <div class="card-body p-4">
          <form @submit.prevent="handleSubmit" class="row g-3 align-items-center">

            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingName" placeholder="Item Name"
                  v-model="itemDetails.name" required>
                <label for="floatingName">Item Name</label>
              </div>
            </div>

            <div class="col-md-4">
              <div class="input-group has-validation">
                <span class="input-group-text bg-light border-end-0">$</span>
                <div class="form-floating">
                  <input type="number" class="form-control border-start-0 ps-2" id="floatingPrice" placeholder="0.00"
                    v-model="itemDetails.price" required>
                  <label for="floatingPrice" class="z-index-1">Price</label>
                </div>
              </div>
            </div>

            <div class="col-md-2">
              <button type="submit" class="btn btn-dark w-100 py-3 fw-bold shadow-sm h-100">
                ADD
              </button>
            </div>

          </form>
        </div>
      </div>

      <div class="card shadow border-0 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0 align-middle">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="py-3 ps-4">Item Name</th>
                <th scope="col" class="py-3 text-end pe-4">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="products.length === 0">
                <td colspan="2" class="text-center py-4 text-muted">No items found. Add one above!</td>
              </tr>
              <tr v-for="item in products" :key="item._id">
                <td class="ps-4 fw-medium">{{ item.name }}</td>
                <td class="text-end pe-4 font-monospace fw-bold text-dark">
                  {{ formatCurrency(item.price) }}
                  <button @click="deleteItem(item._id)" class="bg-transparent border-0"><i
                      class="text-danger bi bi-trash2"></i></button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getItemsOrCutomers, addItemsOrCutomers, deleteItemsOrCutomers } from "../services/service";

export default {
  name: "Items",
  data() {
    return {
      products: [],
      itemDetails: {
        name: "",
        price: ""
      }
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const response = await getItemsOrCutomers('items');
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async handleSubmit() {
      try {
        if (!this.itemDetails.name || !this.itemDetails.price) return;

        const res = await addItemsOrCutomers('items', this.itemDetails);
        if (res.status == 200 || res.status == 201) {
          this.itemDetails.name = ""; // Reset form
          this.itemDetails.price = "";
          this.getItems();
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },
    async deleteItem(id) {
      try {
        const res = await deleteItemsOrCutomers('items', id);
        if (res.status == 200 || res.status == 201) {
          this.getItems();
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    formatCurrency(value) {
      if (value === undefined || value === null || value === '') return '$0.00';
      const numberValue = parseFloat(value);
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numberValue);
    }
  },
};
</script>

<style scoped>
.z-index-1 {
  z-index: 1;
}

.card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}
</style>
