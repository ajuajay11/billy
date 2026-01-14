<template>
    <div class="d-flex min-vh-100 bg-light">

        <div class="d-none d-md-block">
            <Sidebar />
        </div>

        <main class="flex-grow-1 p-2 p-md-4">
            <div class="container-fluid">
                <div class="row d-block d-md-none">
                    <ul class="nav nav-pills d-flex mb-auto">
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
                </div>
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup>
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import Sidebar from '../components/Sidebar.vue';
import { ref } from "vue";

const visible = ref(false);

</script>