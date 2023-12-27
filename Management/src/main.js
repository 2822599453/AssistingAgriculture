import { createApp } from 'vue'
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Particles, {
  init: async engine => {
      await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
  },
});

app.mount('#app')
