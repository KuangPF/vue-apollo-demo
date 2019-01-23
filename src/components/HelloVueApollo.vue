<template>
<div class="vue-apollo">
  <div v-if="$apollo.loading">Loading...</div>
  <p>Books:</p>
  <div v-for="(item, index) in books">
    <p>author:{{item.author}}</p>
    <p>title:{{item.title}}</p>
  </div>
</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    hello: gql`{hello}`,
    books: gql`{books{title author}}`
  },
}
</script>

<style>
</style>
