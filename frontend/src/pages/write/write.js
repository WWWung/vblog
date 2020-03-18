import Write from './markdown.vue'
import Vue from 'vue'
import './write.less'
import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css';
import httpExtension from '@/api/api'
import {
    Message
} from 'element-ui'

Vue.component(Message.name, Message)
Vue.prototype.$message = Message
Vue.use(httpExtension)
new Vue({
    el: '#app',
    render: h => h(Write)
})

window.addEventListener("scroll", e => {
    const dom = document.querySelector(".v-note-op")
    if (!dom) {
        return;
    }
    if (document.documentElement.scrollTop >= 165) {
        document.body.classList.add('showTools')
        if (!dom.style.width) {
            dom.style.width = `${document.querySelector('.editorWrap').getBoundingClientRect().width}px`;
        }
    } else {
        document.body.classList.remove('showTools');
        if (dom.style.width) {
            dom.style.width = '';
        }
    }
})