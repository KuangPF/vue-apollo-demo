import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloVueApollo from '@/components/HelloVueApollo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vue-apollo',
      name: 'HelloVueApollo',
      component: HelloVueApollo
    }
  ]
})
