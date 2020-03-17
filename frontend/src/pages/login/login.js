import Login from './login.vue'
import Vue from 'vue'
import '@/styles/index.less'
import httpExtension from '@/api/api'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Message
} from 'element-ui'

Vue.component(Message.name, Message)
Vue.prototype.$message = Message
Vue.use(httpExtension)
new Vue({
    el: '#app',
    render: h => h(Login)
})