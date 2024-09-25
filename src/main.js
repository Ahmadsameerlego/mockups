import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// import bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


// import primevue 
import PrimeVue from 'primevue/config';
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

import ToastService from 'primevue/toastservice';


// import axios
import axios from "axios";
axios.defaults.baseURL = "https://oceanoutdoor-mockup.com/api/";
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.lang = localStorage.getItem("locale");
axios.defaults.headers.post['Accept'] = 'application/json'

// // if (process.env.NODE_ENVـ === 'development') {
//     axios.defaults.baseURL = '/api/';  // This will use the proxy
// //    } else {
// //     axios.defaults.baseURL = 'https://oceanoutdoor-mockup.com/api/';  // Production URL
// //  }

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
// .use(MotionPlugin as any)
app.use(ToastService)

app.mount('#app')
