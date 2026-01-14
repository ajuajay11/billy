<template>
  <div>
    <h2>Create Invoice</h2>

    <!-- Customer + Date -->
    <div style="margin-bottom: 12px">
      <label>Customer</label>
      <select v-model="invoice.customer" @change="onCustomerChange" required>
        <option value="" disabled>Select customer</option>
        <option v-for="c in customers" :key="c._id" :value="c._id">
          {{ c.userName }} ({{ c.discount }}%)
        </option>
      </select>

      <label style="margin-left: 12px">Date</label>
      <input type="date" v-model="invoice.date" required />

      <label style="margin-left: 12px">Discount %</label>
      <input
        type="number"
        v-model.number="invoice.discountPercent"
        min="0"
        max="100"
        @input="recalculateTotals"
      />
    </div>

    <!-- Items table -->
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%">
      <thead>
        <tr>
          <th>Item</th>
          <th style="width: 90px">Qty</th>
          <th style="width: 120px">Price</th>
          <th style="width: 120px">Total</th>
          <th style="width: 70px">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td>
            <select v-model="row.item" @change="onItemChange(idx)" required>
              <option value="" disabled>Select item</option>
              <option v-for="it in items" :key="it._id" :value="it._id">
                {{ it.name }} - {{ it.phone }}
              </option>
            </select>
          </td>

          <td>
            <input
              type="number"
              min="1"
              v-model.number="row.qty"
              @input="onQtyOrPriceChange(idx)"
              required
            />
          </td>

          <td>
            <input
              type="number"
              min="0"
              v-model.number="row.price"
              @input="onQtyOrPriceChange(idx)"
              required
            />
          </td>

          <td>
            {{ formatMoney(row.total) }}
          </td>

          <td>
            <button type="button" @click="removeRow(idx)">X</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px">
      <button type="button" @click="addRow">+ Add Row</button>
    </div>

    <!-- Totals -->
    <div style="margin-top: 16px">
      <p>
        Subtotal: <b>{{ formatMoney(invoice.subtotal) }}</b>
      </p>
      <p>
        Discount ({{ invoice.discountPercent }}%):
        <b>{{ formatMoney(discountAmount) }}</b>
      </p>
      <p>
        Grand Total: <b>{{ formatMoney(invoice.grandTotal) }}</b>
      </p>
    </div>

    <!-- Submit -->
    <form @submit.prevent="handleSubmit" style="margin-top: 12px">
      <button type="submit">Save Invoice</button>
    </form>
  </div>
</template>

<script>
// IMPORTANT: import the functions you actually have in your service file
import { getItemsOrCutomers, submitInvoice } from "../services/service";

export default {
  name: "Invoice",
  data() {
    return {
      customers: [],
      items: [],
      rows: [{ item: "", qty: 1, price: 0, total: 0 }],
      invoice: {
        customer: "",
        date: "",
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
        console.log(e);
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
      this.rows.splice(index, 1);
      if (this.rows.length === 0) {
        this.addRow();
      }
      this.recalculateTotals();
    },

    formatMoney(n) {
      const num = Number(n) || 0;
      return num.toFixed(2);
    },

    async handleSubmit() {
      try {
        if (!this.invoice.customer || !this.invoice.date) {
          return alert("Please select customer and date");
        }
        if (!this.rows.length || this.rows.some((r) => !r.item)) {
          return alert("Please add at least 1 item and select it");
        }

        // Payload matching your simple schema:
        const payload = {
          customer: this.invoice.customer,
          date: this.invoice.date,
          items: this.rows.map((r) => ({
            item: r.item,
            qty: Number(r.qty),
            price: Number(r.price),
            total: Number(r.total),
          })),
          subtotal: Number(this.invoice.subtotal),
          discountPercent: Number(this.invoice.discountPercent),
          grandTotal: Number(this.invoice.grandTotal),
        };

        const res = await submitInvoice(payload); // should POST /invoices
        alert("Invoice saved!");

        // reset
        this.invoice = {
          customer: "",
          date: "",
          discountPercent: 0,
          subtotal: 0,
          grandTotal: 0,
        };
        this.rows = [{ item: "", qty: 1, price: 0, total: 0 }];
      } catch (e) {
        console.log(e);
        alert(e?.response?.data?.message || "Failed to save invoice");
      }
    },
  },
};
</script>
