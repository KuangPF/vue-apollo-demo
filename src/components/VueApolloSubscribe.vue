<template>
  <div class="subscribe-content">
    <h2>订阅：</h2>
    <h2>查询：</h2>
    {{hello}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    hello:  gql`{hello}`
  }
}
</script>

<style>
</style>
