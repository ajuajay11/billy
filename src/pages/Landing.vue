<template>
    <div class="d-flex flex-column min-vh-100">
        <Header />
        <main class="flex-grow-1">
            <div class="container py-5">
                <!-- Hero Section -->
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5 mb-5">
                    <div class="col-12 col-sm-8 col-lg-12">
                        <img :src="heroLogo" class="d-block mx-auto img-fluid" alt="Billy Hero"
                            style="max-height: 400px;" loading="lazy">
                    </div>
                    <div class="col-lg-12">
                        <h1 class="display-5 fw-bold lh-1 mb-3 text-primary-custom">Welcome to Billy</h1>
                        <p class="lead">This demo is a tiny billing workflow. You can add items, add customers with
                            discounts, then create invoices from those ingredients. Each invoice can be viewed and
                            printed as a PDF.</p>
                        <div class="d-grid gap-2 d-flex justify-content-center">
                            <router-link to="/dashboard" class="btn btn-primary btn-lg px-4 me-md-2">Get
                                Started</router-link>
                            <router-link to="/about" class="btn btn-outline-secondary btn-lg px-4">Learn
                                More</router-link>
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