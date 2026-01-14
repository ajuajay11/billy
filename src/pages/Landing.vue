<template>
    <div class="d-flex flex-column min-vh-100">
        <Header />
        <main class="flex-grow-1">
            <div class="container py-5">
                <!-- Hero Section -->
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5 mb-5">
                    <div class="col-10 col-sm-8 col-lg-6">
                        <img :src="heroLogo" class="d-block mx-auto img-fluid" alt="Billy Hero"
                            style="max-height: 400px;" loading="lazy">
                    </div>
                    <div class="col-lg-6">
                        <h1 class="display-5 fw-bold lh-1 mb-3 text-primary-custom">Welcome to Billy</h1>
                        <p class="lead">This demo is a tiny billing workflow. You can add items, add customers with
                            discounts, then create invoices from those ingredients. Each invoice can be viewed and
                            printed as a PDF.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 me-md-2">Get
                                Started</router-link>
                            <router-link to="/about" class="btn btn-outline-secondary btn-lg px-4">Learn
                                More</router-link>
                        </div>
                    </div>
                </div>

                <!-- How it Works -->
                <div class="row mb-5">
                    <div class="col-md-12">
                        <div class="p-4 rounded-3 bg-light border shadow-sm">
                            <h2 class="mb-3">How it works</h2>
                            <p>Start by creating a few items and customers. Then head to invoices to build a bill by
                                selecting a customer and adding line items. Totals are calculated automatically, and the
                                invoice detail view lets you review and print a clean copy.</p>
                        </div>
                    </div>
                </div>

                <!-- Features Grid -->
                <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                    <!-- Items -->
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm h-hover">
                            <div class="card-body">
                                <h3 class="card-title h4 text-info">Items</h3>
                                <p class="card-text">
                                    <strong>Item name:</strong> the label that appears on invoices.<br>
                                    <strong>Price:</strong> the default unit price used when the item is selected.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Customers -->
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm h-hover">
                            <div class="card-body">
                                <h3 class="card-title h4 text-success">Customers</h3>
                                <p class="card-text">
                                    <strong>Customer name:</strong> the person or company being billed.<br>
                                    <strong>Discount %:</strong> the default discount applied to that customer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Invoices -->
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm h-hover">
                            <div class="card-body">
                                <h3 class="card-title h4 text-warning">Invoices</h3>
                                <ul class="list-unstyled mb-0 small">
                                    <li><strong>Invoice ID:</strong> unique number.</li>
                                    <li><strong>Customer:</strong> selected customer.</li>
                                    <li><strong>Date:</strong> creation date.</li>
                                    <li><strong>Line items:</strong> name, qty, price, total.</li>
                                    <li><strong>Subtotal:</strong> sum before discount.</li>
                                    <li><strong>Discount %:</strong> applied to subtotal.</li>
                                    <li><strong>Total:</strong> subtotal minus discount.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Task Footer -->
                <div class="row">
                    <div class="col-12">
                        <div class="alert alert-info" role="alert">
                            <strong>Interview task:</strong> Build a functional replica of this app. Your version should
                            include all features you see here, with the same user flows, data points, and behaviors. You
                            can choose your own design and layout, but the app should be functionally similar to this
                            one. Have fun with it and all the best.
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import heroLogo from '../assets/logo.svg';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
.h-hover:hover {
    transform: translateY(-5px);
    transition: transform 0.3sease;
}
</style>