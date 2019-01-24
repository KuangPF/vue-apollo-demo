<template>
  <div class="vue-apollo">
    <div v-if="$apollo.loading">Loading...</div>
    <h2>Books:</h2>
    <div v-for="(item, index) in books">
      <p>author:{{item.author}}</p>
      <p>title:{{item.title}}</p>
    </div>
    {{ping}}

    <h3>轮询：</h3>
    <div v-for="(item, index) in tags">
      <p>id:{{item.id}}</p>
      <p>label:{{item.label}}</p>
    </div>
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
    tags: {
      query: gql`query tagList {
      tags {
        id,
        label
      }
    }`,
      pollInterval: 30000, // 毫秒
    },
  }
}
</script>

<style>
</style>
