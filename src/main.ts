import { createApp } from 'vue'
import { s3Layer } from 'vue3-layer';

import "./style.css"

import 'vue3-layer/dist/s3Layer.css';



import App from './App.vue'

const app = createApp(App);

app.component('s3-layer', s3Layer).mount('#app');