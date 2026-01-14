<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container w-100">
            <div class="w-100 row align-items-center justify-content-between">
                <div class="col-6">
                    <router-link class="navbar-brand d-flex align-items-center" to="/">
                        <img :src="logo" alt="Billy Logo" width="160"
                            class="img-fluid d-inline-block align-text-top me-2">
                        Billy
                    </router-link>
                </div>
                <div class="col-6 d-flex justify-content-end">

                    <router-link to="/dashboard" class="navbar-text">
                        <button class="boton-elegante   ">Dashboard</button>
                    </router-link>

                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import logo from '../assets/logo.svg';

</script>

<style scoped>
.navbar {
    background-color: var(--primary-color) !important;
}
</style>
