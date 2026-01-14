import { createWebHistory, createRouter } from 'vue-router'

import Landing from '../pages/Landing.vue'
import AboutView from '../pages/About.vue'

import Dashboard from '../layouts/Dashboard.vue'
import Items from '../pages/Items.vue'
import Customers from '../pages/Customer.vue'
import Invoices from '../pages/Invoice.vue'

const routes = [
    { path: '/', component: Landing },
    { path: '/about', component: AboutView },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '', component: Items },
            { path: 'customers', component: Customers },
            { path: 'invoices', component: Invoices }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;