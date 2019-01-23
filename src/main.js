// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// 与 API 的 HTTP 连接
const httpLink = new HttpLink({
  // 你需要在这里使用绝对路径
  uri: 'http://localhost:4000/graphql',
})

// 缓存实现
const cache = new InMemoryCache()

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  components: { App },
  template: '<App/>'
})