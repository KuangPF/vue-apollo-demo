<template>
  <div class="vue-apollo">
    <div v-if="$apollo.loading">Loading...</div>
    <p>Books:</p>
    <div v-for="(item, index) in books">
      <p>author:{{item.author}}</p>
      <p>title:{{item.title}}</p>
    </div>
    {{ping}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    books: gql`{books{title author}}`,
    ping: {
      // gql 查询
      query: gql`query PingMessage($message: String!) {
      ping(message: $message)
    }`,
      // 静态参数
      variables: {
        message: 'Meow',
      },
    },
  },
}
</script>

<style>
</style>
