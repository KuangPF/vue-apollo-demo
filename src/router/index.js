import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloVueApollo from '@/components/HelloVueApollo'
import VueApolloMutate from '@/components/VueApolloMutate'
import VueApolloSubscribe from '@/components/VueApolloSubscribe'

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
    },
    {
      path: '/vue-apollo-mutate',
      name: 'VueApolloMutate',
      component: VueApolloMutate
    },
    {
      path: '/vue-apollo-subscribe',
      name: 'VueApolloSubscribe',
      component: VueApolloSubscribe
    }
  ]
})
