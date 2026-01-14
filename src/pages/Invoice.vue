<template>
  <div class="row justify-content-start">
    <div class="col-md-10">

      <!-- Header & Create Button -->
      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 class="fw-bold text-dark">Invoices</h2>

        <button @click="$router.push('/dashboard/invoices/create')"
          class="btn btn-dark py-3 px-3 fw-bold shadow-sm h-100">
          <i class="bi bi-plus-circle me-2"></i> create Invoice
        </button>
      </div>

      <!-- Invoices List -->
      <div class="card shadow-sm border-0 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="bg-dark text-white">
              <tr>
                <th scope="col" class="py-3 ps-4">Customer</th>
                <th scope="col" class="py-3">Date</th>
                <th scope="col" class="py-3 text-end">Total</th>
                <th scope="col" class="py-3 ps-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="invoices.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-inbox display-4 mb-2"></i>
                    <p>No invoices found.</p>
                  </div>
                </td>
              </tr>
              <tr v-for="inv in invoices" :key="inv._id">
                <td class="ps-4 fw-medium">{{ inv.customer?.username || inv.customer?.userName || 'N/A' }}</td>
                <td>{{ formatDate(inv.date) }}</td>
                <td class="text-end font-monospace fw-bold text-success">{{ formatMoney(inv.grandTotal) }}</td>
                <td class="ps-4">
                  <button class="btn btn-sm btn-outline-primary"
                    @click="$router.push(`/dashboard/invoices/view/${inv._id}`)">
                    <i class="bi bi-eye me-1"></i>View
                  </button>
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
import { getInvoice } from "../services/service";

export default {
  name: "Invoice",
  data() {
    return {
      invoices: [],
    };
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    async fetchInvoices() {
      try {
        const res = await getInvoice();
        this.invoices = res.data || res;
      } catch (e) { console.error("Error loading invoices", e); }
    },
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n) || 0);
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}
</style>
