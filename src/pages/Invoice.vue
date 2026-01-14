<template>
  <div class="row justify-content-start">
    <div class="col-md-10">

      <!-- Header & Create Button -->
      <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h2 class="fw-bold text-dark">Invoices</h2>
        <button class="boton-elegante text-white" @click="openCreateDialog">
          + Create Invoice
        </button>
      </div>

      <!-- Invoices List (Bootstrap Style) -->
      <div class="card shadow border-0 overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0 align-middle">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="py-3 ps-4">Customer</th>
                <th scope="col" class="py-3">Date</th>
                <th scope="col" class="py-3 text-end">Total</th>
                <th scope="col" class="py-3 ps-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="invoices.length === 0">
                <td colspan="4" class="text-center py-4 text-muted">No invoices found.</td>
              </tr>
              <tr v-for="inv in invoices" :key="inv._id">
                <td class="ps-4 fw-medium">{{ inv.customer?.username || inv.customer?.userName || 'N/A' }}</td>
                <td>{{ formatDate(inv.date) }}</td>
                <td class="text-end font-monospace fw-bold text-primary">{{ formatMoney(inv.grandTotal) }}</td>
                <td class="ps-4">
                  <button class="btn btn-sm btn-outline-dark" @click="viewInvoice(inv)">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create Invoice Dialog -->
      <Dialog v-model:visible="showCreateDialog" modal header="Create New Invoice" :style="{ width: '80vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }" class="bgban-modal">
        <div class="container-fluid p-0">
          <div class="row g-3 mb-4">
            <div class="col-md-5">
              <label class="form-label fw-bold small text-uppercase text-secondary">Customer</label>
              <select class="form-select" v-model="invoice.customer" @change="onCustomerChange">
                <option value="" disabled>Select customer...</option>
                <option v-for="c in customers" :key="c._id" :value="c._id">
                  {{ c.userName || c.username }} ({{ c.discount }}%)
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold small text-uppercase text-secondary">Date</label>
              <input type="date" class="form-control" v-model="invoice.date" />
            </div>
            <div class="col-md-2">
              <label class="form-label fw-bold small text-uppercase text-secondary">Discount %</label>
              <input type="number" class="form-control" v-model.number="invoice.discountPercent" min="0" max="100"
                @input="recalculateTotals" />
            </div>
          </div>

          <!-- Line Items -->
          <div class="table-responsive mb-3">
            <table class="table table-borderless align-middle">
              <thead class="text-secondary small text-uppercase border-bottom">
                <tr>
                  <th style="width: 40%">Item</th>
                  <th style="width: 15%">Qty</th>
                  <th style="width: 20%">Price</th>
                  <th style="width: 20%">Total</th>
                  <th style="width: 5%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in rows" :key="idx">
                  <td>
                    <select class="form-select" v-model="row.item" @change="onItemChange(idx)">
                      <option value="" disabled>Select item</option>
                      <option v-for="it in items" :key="it._id" :value="it._id">
                        {{ it.name }}
                      </option>
                    </select>
                  </td>
                  <td><input type="number" class="form-control" min="1" v-model.number="row.qty"
                      @input="onQtyOrPriceChange(idx)" /></td>
                  <td><input type="number" class="form-control" min="0" v-model.number="row.price"
                      @input="onQtyOrPriceChange(idx)" /></td>
                  <td>
                    <div class="form-control bg-light border-0 fw-bold">{{ formatMoney(row.total) }}</div>
                  </td>
                  <td><button type="button" class="btn btn-outline-danger btn-sm rounded-circle"
                      @click="removeRow(idx)">×</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" class="btn btn-light text-primary fw-bold mb-4" @click="addRow">+ Add Item</button>

          <div class="d-flex justify-content-end align-items-center gap-4 border-top pt-3">
            <div class="text-end">
              <div class="text-secondary small">Grand Total</div>
              <div class="h4 fw-bold text-primary mb-0">{{ formatMoney(invoice.grandTotal) }}</div>
            </div>
            <button type="button" class="boton-elegante" @click="handleSubmit">Save Invoice</button>
          </div>
        </div>
      </Dialog>

      <!-- View Invoice Dialog -->
      <Dialog v-model:visible="showViewDialog" modal header="Invoice Details" :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <div id="printableArea" class="p-4 bg-white" v-if="selectedInvoice">
          <div class="d-flex justify-content-between mb-5">
            <div>
              <h1 class="fw-bold text-primary">INVOICE</h1>
              <div class="text-muted small">#{{ selectedInvoice._id }}</div>
            </div>
            <div class="text-end">
              <h5 class="fw-bold">{{ selectedInvoice.customer?.username || selectedInvoice.customer?.userName ||
                'Customer' }}</h5>
              <div>Date: {{ formatDate(selectedInvoice.date) }}</div>
            </div>
          </div>

          <table class="table table-striped mb-4">
            <thead class="table-dark">
              <tr>
                <th>Item</th>
                <th class="text-center">Qty</th>
                <th class="text-end">Price</th>
                <th class="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedInvoice.items" :key="item._id">
                <td>{{ item.item?.name || 'Item' }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-end">{{ formatMoney(item.price) }}</td>
                <td class="text-end fw-bold">{{ formatMoney(item.total) }}</td>
              </tr>
            </tbody>
          </table>

          <div class="row justify-content-end">
            <div class="col-6 text-end">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted">Subtotal:</span>
                <span class="fw-bold">{{ formatMoney(selectedInvoice.subtotal) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-1" v-if="selectedInvoice.discountPercent > 0">
                <span class="text-muted">Discount ({{ selectedInvoice.discountPercent }}%):</span>
                <span class="text-danger">- {{ formatMoney((selectedInvoice.subtotal * selectedInvoice.discountPercent)
                  / 100) }}</span>
              </div>
              <div class="d-flex justify-content-between border-top pt-2 mt-2">
                <span class="h5 fw-bold">Grand Total:</span>
                <span class="h5 fw-bold text-primary">{{ formatMoney(selectedInvoice.grandTotal) }}</span>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-secondary" @click="showViewDialog = false">Close</button>
            <button class="boton-elegante" @click="printInvoice">Print Invoice</button>
          </div>
        </template>
      </Dialog>

    </div>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import { getItemsOrCutomers, submitInvoice, getInvoice } from "../services/service";

export default {
  name: "Invoice",
  components: { Dialog },
  data() {
    return {
      invoices: [],
      customers: [],
      items: [],

      showCreateDialog: false,
      showViewDialog: false,
      selectedInvoice: null,

      rows: [{ item: "", qty: 1, price: 0, total: 0 }],
      invoice: {
        customer: "",
        date: new Date().toISOString().split('T')[0],
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
    this.fetchInvoices();
  },
  methods: {
    async loadData() {
      try {
        const custRes = await getItemsOrCutomers("customer");
        this.customers = custRes.data || [];
        const itemRes = await getItemsOrCutomers("items");
        this.items = itemRes.data || [];
      } catch (e) { console.error(e); }
    },
    async fetchInvoices() {
      try {
        const res = await getInvoice();
        this.invoices = res.data || res;
      } catch (e) { console.error("Error loading invoices", e); }
    },

    openCreateDialog() {
      this.showCreateDialog = true;
      this.resetForm();
    },
    viewInvoice(inv) {
      this.selectedInvoice = inv;
      this.showViewDialog = true;
    },
    printInvoice() {
      const printContent = document.getElementById('printableArea').innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    },

    onCustomerChange() {
      const selected = this.customers.find(c => c._id === this.invoice.customer);
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
      const subtotal = this.rows.reduce((sum, r) => sum + (Number(r.total) || 0), 0);
      this.invoice.subtotal = subtotal;
      const grand = subtotal - this.discountAmount;
      this.invoice.grandTotal = grand < 0 ? 0 : grand;
    },
    addRow() {
      this.rows.push({ item: "", qty: 1, price: 0, total: 0 });
    },
    removeRow(index) {
      this.rows.splice(index, 1);
      if (this.rows.length === 0) this.addRow();
      this.recalculateTotals();
    },
    async handleSubmit() {
      try {
        if (!this.invoice.customer || !this.invoice.date) return alert("Select customer & date");
        const payload = {
          customer: this.invoice.customer,
          date: this.invoice.date,
          items: this.rows.map(r => ({ item: r.item, qty: Number(r.qty), price: Number(r.price), total: Number(r.total) })),
          subtotal: Number(this.invoice.subtotal),
          discountPercent: Number(this.invoice.discountPercent),
          grandTotal: Number(this.invoice.grandTotal),
        };
        await submitInvoice(payload);
        this.showCreateDialog = false;
        this.fetchInvoices();
        this.resetForm();
      } catch (e) { console.error(e); }
    },
    resetForm() {
      this.invoice = { customer: "", date: new Date().toISOString().split('T')[0], discountPercent: 0, subtotal: 0, grandTotal: 0 };
      this.rows = [{ item: "", qty: 1, price: 0, total: 0 }];
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

<style>
.bgban-modal .p-dialog-content {
  background-image: url('../assets/bgban.png');
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.92);
  /* High transparency for subtle effect */
  background-blend-mode: overlay;
}

.bgban-modal .p-dialog-header {
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>

<style scoped></style>
