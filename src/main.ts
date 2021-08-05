import { createApp } from 'vue';
import Equal from 'equal-vue'
import App from './App.vue';
import 'equal-vue/dist/style.css'
import 'flexboxgrid2/flexboxgrid2.css'
import { store } from './store'

createApp(App).use(store).use(Equal).mount('#app');
