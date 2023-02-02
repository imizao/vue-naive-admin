import '@/styles/reset.css'
import '@/styles/variables.css'
import '@/styles/index.scss'
import 'uno.css'


import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import '@/views/dashboard/useTable.js'
import { hasPermission } from '@/utils'



function setupApp() {
  const app = createApp(App)
  app.config.globalProperties.$hasPermission = hasPermission;
  setupStore(app)

  setupRouter(app)

  app.mount('#app')
}

setupApp()
