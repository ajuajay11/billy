<template>
    <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
            <div class="d-flex justify-content-between align-items-center mb-4 mt-2 no-print">
                <h2 class="fw-bold text-dark">Invoice Details</h2>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary" @click="$router.push('/dashboard/invoices')">
                        <i class="bi bi-arrow-left me-2"></i>Back
                    </button>

                    <button @click="printInvoice" class="btn btn-dark py-3 px-3 fw-bold shadow-sm h-100">
                        <i class="bi bi-printer me-2"></i> Print
                    </button>
                </div>
            </div>

            <div class="card shadow border-0" id="printableArea" v-if="invoice">
                <div class="card-body p-3 p-md-5 bg-white">
                    <!-- Invoice Header -->
                    <div class="row mb-4 mb-md-5 pb-3 pb-md-4 border-bottom">
                        <div class="col-6">
                            <h1 class="fw-bold text-primary mb-2 invoice-title">Invoice</h1>
                            <div class="text-muted small invoice-id">ID: {{ invoice._id }}</div>
                        </div>
                        <div class="col-6 text-end">
                            <h4 class="fw-bold mb-1 customer-name">
                                {{ getCustomerName(invoice) }}
                            </h4>
                            <div class="text-secondary invoice-date">
                                <i class="bi bi-calendar me-1"></i>{{ formatDate(invoice.date) }}
                            </div>
                            <div v-if="invoice.customer?.discount > 0" class="mt-1">
                                <span class="badge bg-success">{{ invoice.customer.discount }}% Discount</span>
                            </div>
                        </div>
                    </div>

                    <!-- Items Table -->
                    <div class="table-container mb-4 mb-md-5">
                        <div class="table-responsive" style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
                            <table class="table table-striped table-borderless mb-0" style="min-width: 500px;">
                                <thead class="bg-dark text-white">
                                    <tr>
                                        <th class="py-3 ps-3">Item</th>
                                        <th class="py-3 text-center">Qty</th>
                                        <th class="py-3 text-end">Price</th>
                                        <th class="py-3 text-end pe-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in invoice.items" :key="item._id">
                                        <td class="ps-3">{{ item.item?.name || item.name || 'Unknown Item' }}</td>
                                        <td class="text-center">{{ item.qty }}</td>
                                        <td class="text-end">{{ formatMoney(item.price) }}</td>
                                        <td class="text-end pe-3 fw-bold text-dark">{{ formatMoney(item.total) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Totals -->
                    <div class="row justify-content-end">
                        <div class="col-12 col-md-6 col-lg-5">
                            <div class="bg-light p-3 p-md-4 rounded totals-box">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="text-secondary">Subtotal:</span>
                                    <span class="fw-semibold">{{ formatMoney(invoice.subtotal) }}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2" v-if="invoice.discountPercent > 0">
                                    <span class="text-secondary">Discount ({{ invoice.discountPercent }}%):</span>
                                    <span class="text-danger fw-semibold">
                                        - {{ formatMoney(invoice.subtotal * invoice.discountPercent / 100) }}
                                    </span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="h5 fw-bold mb-0 text-dark">Grand Total:</span>
                                    <span class="h4 fw-bold text-success mb-0">{{ formatMoney(invoice.grandTotal)
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading / Error State -->
            <div v-else class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-3">{{ loading ? 'Loading invoice...' : 'Invoice not found' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getInvoiceById } from "../services/service";

export default {
    name: "ViewInvoice",
    data() {
        return {
            invoice: null,
            loading: true,
        };
    },
    mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.fetchInvoice(id);
        }
    },
    methods: {
        async fetchInvoice(id) {
            this.loading = true;
            try {
                const res = await getInvoiceById(id);
                let data = res.data || res;

                // Handle both single object and array response
                if (Array.isArray(data) && data.length > 0) {
                    this.invoice = data[0];
                } else if (data && typeof data === 'object') {
                    this.invoice = data;
                } else {
                    console.warn("No valid invoice data received");
                }

                console.log("Loaded invoice:", this.invoice);
            } catch (error) {
                console.error("Failed to load invoice:", error);
                alert("Failed to load invoice. Please try again later.");
            } finally {
                this.loading = false;
            }
        },

        getCustomerName(invoice) {
            const customer = invoice?.customer;
            if (!customer) return "Unknown Customer";

            return (
                customer.username ||
                customer.userName ||
                customer.name ||
                (customer._id ? `Customer (${customer._id.substring(0, 8)}...)` : "Unknown Customer")
            );
        },

        printInvoice() {
            window.print();
        },

        formatMoney(value) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
            }).format(Number(value) || 0);
        },

        formatDate(date) {
            if (!date) return "—";
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        },
    },
};
</script>

<style scoped>
/* Table scroll for mobile */
.table-container {
    width: 100%;
    overflow: hidden;
}

.table-responsive {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
}

.table {
    white-space: nowrap;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .invoice-title {
        font-size: 1.75rem;
    }

    .invoice-id {
        font-size: 0.75rem;
        word-break: break-all;
    }

    .customer-name {
        font-size: 1rem;
    }

    .invoice-date {
        font-size: 0.875rem;
    }

    .table thead th {
        font-size: 0.875rem;
        padding: 0.75rem 0.5rem !important;
    }

    .table tbody td {
        font-size: 0.875rem;
        padding: 0.75rem 0.5rem !important;
    }

    .totals-box {
        font-size: 0.9rem;
    }

    .h4-md {
        font-size: 1.25rem !important;
    }

    .h3-md {
        font-size: 1.5rem !important;
    }

    .btn {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }

    .badge {
        font-size: 0.7rem;
    }
}

/* Very small screens */
@media (max-width: 480px) {
    .card-body {
        padding: 1rem !important;
    }

    .invoice-title {
        font-size: 1.5rem;
    }

    .customer-name {
        font-size: 0.9rem;
    }

    .btn {
        font-size: 0.75rem;
        padding: 0.4rem 0.6rem;
    }

    .btn i {
        font-size: 0.875rem;
    }
}

/* Print styles */
@media print {
    .no-print {
        display: none !important;
    }

    body * {
        visibility: hidden;
    }

    #printableArea,
    #printableArea * {
        visibility: visible;
    }

    #printableArea {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: none !important;
        border: none !important;
    }

    .table-responsive {
        overflow: visible !important;
    }

    .table {
        width: 100% !important;
    }
}
</style>