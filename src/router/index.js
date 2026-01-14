import { createWebHistory, createRouter } from 'vue-router'

import Landing from '../pages/Landing.vue'
import AboutView from '../pages/About.vue'
import Items from '../pages/Items.vue'
import Customers from '../pages/Customer.vue'
import Invoices from '../pages/Invoice.vue'

const routes = [
    { path: '/', component: Landing },
    { path: '/about', component: AboutView },
    { path: '/items', component: Items },
    { path: '/customers', component: Customers },
    { path: '/invoice', component: Invoices },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;