<template>
    <aside class="d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm sidebar" style="width: 280px;">
        <router-link to="/"
            class="d-flex align-items-center justify-content-center mb-md-0 link-dark text-decoration-none">
            <img :src="logo" alt="Billy" width="140" height="50" class="me-2">
        </router-link>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto fs-4 fw-bold">
            <li class="nav-item">
                <router-link to="/dashboard" class="nav-link link-dark" active-class="active"
                    exact-active-class="active">
                    Items
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/customers" class="nav-link link-dark" active-class="active">
                    Customers
                </router-link>
            </li>
            <li>
                <router-link to="/dashboard/invoices" class="nav-link link-dark" active-class="active">
                    Invoices
                </router-link>
            </li>
        </ul>
        <hr>
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="logo" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>User</strong>
            </a>
            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                <li><router-link class="dropdown-item" to="/">Sign out</router-link></li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import logo from '../assets/logo.svg';
</script>

<style scoped>
.sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background-color: var(--primary-color) !important;
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
}
</style>
