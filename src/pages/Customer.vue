<template>
  <div class="row justify-content-start">
    <div class="col-md-10">

      <!-- Page Header -->
      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 class="fw-bold text-dark">Customer Management</h2>
        <span class="badge bg-primary rounded-pill fs-6">{{ customers.length }} customers</span>
      </div>

      <!-- Add Customer Form (Kept Inline to match Items style) -->
      <div class="card shadow-sm border-0 mb-5">
        <div class="card-header bg-transparent border-0 pt-4 px-4 pb-0">
          <h5 class="card-title fw-bold text-secondary">Add New Customer</h5>
        </div>
        <div class="card-body p-4">
          <form @submit.prevent="handleSubmit" class="row g-3 align-items-center">

            <!-- Username Input -->
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingUsername" placeholder="Customer Name"
                  v-model="cDetails.username" required>
                <label for="floatingUsername">Customer Name</label>
              </div>
            </div>

            <!-- Discount Input -->
            <div class="col-md-4">
              <div class="input-group has-validation">
                <span class="input-group-text bg-light border-end-0">%</span>
                <div class="form-floating">
                  <input type="number" class="form-control border-start-0 ps-2" id="floatingDiscount" placeholder="0"
                    v-model="cDetails.discount" min="0" max="100" required>
                  <label for="floatingDiscount" class="z-index-1">Discount</label>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="col-md-2">
              <button type="submit" class="boton-elegante w-100 h-100 d-flex justify-content-center align-items-center">
                ADD
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- Customers Table (Bootstrap Style) -->
      <div class="card shadow border-0 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0 align-middle">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="py-3 ps-4">Customer Name</th>
                <th scope="col" class="py-3 text-end pe-4">Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="customers.length === 0">
                <td colspan="2" class="text-center py-4 text-muted">No customers found.</td>
              </tr>
              <tr v-for="c in customers" :key="c._id">
                <td class="ps-4 fw-medium">{{ c.username || c.userName }}</td>
                <td class="text-end pe-4">
                  <span class="badge bg-success rounded-pill">{{ c.discount }}%</span>
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
import { getItemsOrCutomers, addItemsOrCutomers } from "../services/service";

export default {
  name: "Customers",
  data() {
    return {
      customers: [],
      cDetails: {
        username: "",
        discount: ""
      },
      type: 'customer'
    };
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      try {
        const response = await getItemsOrCutomers(this.type);
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    async handleSubmit() {
      try {
        if (!this.cDetails.username || this.cDetails.discount === "") return;

        const res = await addItemsOrCutomers(this.type, this.cDetails);
        if (res.status == 200 || res.status == 201) {
          this.cDetails.username = "";
          this.cDetails.discount = "";
          this.getCustomers();
        }
      } catch (error) {
        console.error("Error adding customer:", error);
      }
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
