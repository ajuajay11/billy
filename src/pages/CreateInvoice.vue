<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 class="fw-bold text-dark">Create New Invoice</h2>
        <button
          class="btn btn-outline-secondary"
          @click="$router.push('/dashboard/invoices')"
        >
          <i class="bi bi-arrow-left me-2"></i>Back to List
        </button>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body p-4">
          <!-- Customer & Date Row -->
          <div class="row g-3 mb-4">
            <div class="col-md-5">
              <label class="form-label fw-semibold">Customer</label>
              <select
                class="form-select form-select-lg"
                v-model="invoice.customer"
                @change="onCustomerChange"
              >
                <option value="" disabled>Select customer...</option>
                <option v-for="c in customers" :key="c._id" :value="c._id">
                  {{ c.userName || c.username }} ({{ c.discount }}% discount)
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label fw-semibold">Date</label>
              <input
                type="date"
                class="form-control form-control-lg"
                v-model="invoice.date"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">Discount %</label>
              <input
                type="number"
                class="form-control form-control-lg"
                v-model.number="invoice.discountPercent"
                min="0"
                max="100"
                step="0.1"
                @input="recalculateTotals"
              />
            </div>
          </div>

          <!-- Line Items -->
          <div class="card border-0 shadow-sm mb-4 bg-light">
            <div class="card-header bg-transparent border-bottom">
              <h6 class="mb-0 fw-semibold">Invoice Items</h6>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-borderless mb-0 align-middle">
                  <thead class="text-secondary small text-uppercase">
                    <tr>
                      <th class="py-3 ps-3" style="width: 40%">Item</th>
                      <th class="py-3" style="width: 15%">Quantity</th>
                      <th class="py-3" style="width: 20%">Price</th>
                      <th class="py-3" style="width: 20%">Total</th>
                      <th class="py-3" style="width: 5%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, idx) in rows"
                      :key="idx"
                      class="border-bottom"
                    >
                      <td class="ps-3 py-3">
                        <select
                          class="form-select"
                          v-model="row.item"
                          @change="onItemChange(idx)"
                        >
                          <option value="" disabled>Select item</option>
                          <option
                            v-for="it in items"
                            :key="it._id"
                            :value="it._id"
                          >
                            {{ it.name }}
                          </option>
                        </select>
                      </td>
                      <td class="py-3">
                        <input
                          type="number"
                          class="form-control"
                          min="1"
                          v-model.number="row.qty"
                          @input="onQtyOrPriceChange(idx)"
                        />
                      </td>
                      <td class="py-3">
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          step="0.01"
                          v-model.number="row.price"
                          @input="onQtyOrPriceChange(idx)"
                        />
                      </td>
                      <td class="py-3">
                        <div
                          class="form-control bg-white border-0 fw-bold text-success"
                        >
                          {{ formatMoney(row.total) }}
                        </div>
                      </td>
                      <td class="py-3">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-danger"
                          @click="removeRow(idx)"
                          :disabled="rows.length === 1"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="p-3">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="addRow"
                >
                  <i class="bi bi-plus-circle me-2"></i>Add Item
                </button>
              </div>
            </div>
          </div>

          <!-- Totals Summary -->
          <div class="row justify-content-end">
            <div class="col-md-5">
              <div class="card border-0 bg-light">
                <div class="card-body">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal:</span>
                    <span class="fw-semibold">{{
                      formatMoney(invoice.subtotal)
                    }}</span>
                  </div>
                  <div
                    class="d-flex justify-content-between mb-2"
                    v-if="invoice.discountPercent > 0"
                  >
                    <span class="text-muted"
                      >Discount ({{ invoice.discountPercent }}%):</span
                    >
                    <span class="text-danger fw-semibold"
                      >- {{ formatMoney(discountAmount) }}</span
                    >
                  </div>
                  <hr />
                  <div class="d-flex justify-content-between">
                    <span class="h5 fw-bold mb-0">Grand Total:</span>
                    <span class="h4 fw-bold text-success mb-0">{{
                      formatMoney(invoice.grandTotal)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-3 mt-4 border-top pt-4">
            <button type="button" class="btn btn-secondary px-4 btn-lg" @click="$router.push('/dashboard/invoices')" >
              Cancel
            </button>
            <button @click="handleSubmit" class="btn btn-dark py-3 fw-bold shadow-sm h-100"
            >
              Save Invoice
            </button>
             
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItemsOrCutomers, submitInvoice } from "../services/service";

export default {
  name: "CreateInvoice",
  data() {
    return {
      customers: [],
      items: [],
      rows: [{ item: "", qty: 1, price: 0, total: 0 }],
      invoice: {
        customer: "",
        date: new Date().toISOString().split("T")[0],
        discountPercent: 0,
        subtotal: 0,
        grandTotal: 0,
      },
    };
  },
  computed: {
    discountAmount() {
      const sub = Number(this.invoice.subtotal) || 0;
      const d = Number(this.invoice.discountPercent) || 0;
      return (sub * d) / 100;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const custRes = await getItemsOrCutomers("customer");
        this.customers = custRes.data || [];
        const itemRes = await getItemsOrCutomers("items");
        this.items = itemRes.data || [];
      } catch (e) {
        console.error(e);
      }
    },
    onCustomerChange() {
      const selected = this.customers.find(
        (c) => c._id === this.invoice.customer
      );
      if (selected) {
        this.invoice.discountPercent = Number(selected.discount) || 0;
        this.recalculateTotals();
      }
    },
    onItemChange(index) {
      const row = this.rows[index];
      const selectedItem = this.items.find((it) => it._id === row.item);
      if (selectedItem) {
        row.price = Number(selectedItem.price) || 0;
      } else {
        row.price = 0;
      }
      this.onQtyOrPriceChange(index);
    },
    onQtyOrPriceChange(index) {
      const row = this.rows[index];
      const qty = Number(row.qty) || 0;
      const price = Number(row.price) || 0;
      row.total = qty * price;
      this.recalculateTotals();
    },
    recalculateTotals() {
      const subtotal = this.rows.reduce(
        (sum, r) => sum + (Number(r.total) || 0),
        0
      );
      this.invoice.subtotal = subtotal;
      const grand = subtotal - this.discountAmount;
      this.invoice.grandTotal = grand < 0 ? 0 : grand;
    },
    addRow() {
      this.rows.push({ item: "", qty: 1, price: 0, total: 0 });
    },
    removeRow(index) {
      if (this.rows.length > 1) {
        this.rows.splice(index, 1);
        this.recalculateTotals();
      }
    },
    async handleSubmit() {
      try {
        if (!this.invoice.customer || !this.invoice.date) {
          alert("Please select customer and date");
          return;
        }
        const validItems = this.rows.filter((r) => r.item && r.qty > 0);
        if (validItems.length === 0) {
          alert("Please add at least one valid item");
          return;
        }

        const payload = {
          customer: this.invoice.customer,
          date: this.invoice.date,
          items: validItems.map((r) => ({
            item: r.item,
            qty: Number(r.qty),
            price: Number(r.price),
            total: Number(r.total),
          })),
          subtotal: Number(this.invoice.subtotal),
          discountPercent: Number(this.invoice.discountPercent),
          grandTotal: Number(this.invoice.grandTotal),
        };

        await submitInvoice(payload);
        this.$router.push("/dashboard/invoices");
      } catch (e) {
        console.error(e);
        alert("Failed to create");
      }
    },
    formatMoney(n) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(n) || 0);
    },
  },
};
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}
</style>
