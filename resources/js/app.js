require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'
import { routes } from './routes'
import { Form, HasError, AlertError } from 'vform'
import Swal from 'sweetalert2'
import Vuex from 'vuex'
import storeData from './store/index'
import filter from './filter'


window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

 /// swirtalert

 window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  window.Toast = Toast

//////////////


///////
Vue.use(VueRouter);
Vue.use(Vuex)

const store = new Vuex.Store(storeData)

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
 Vue.component('admin-main', require('./components/admin/AdminMaster.vue').default);
 Vue.component('home-main', require('./components/public/PublicMaster.vue').default);

const router = new VueRouter({
    routes,
    mode: 'hash'
})

const app = new Vue({
    el: '#app',
    router,
    store
});
