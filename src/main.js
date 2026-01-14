import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'primeicons/primeicons.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue);
app.use(router)
app.mount('#app')