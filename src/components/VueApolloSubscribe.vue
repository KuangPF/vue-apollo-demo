<template>
  <div class="subscribe-content">
    <h2>订阅：</h2>
    <h2>查询：</h2>
    <h3>hello:</h3>
    {{hello}}
    <h3>ping:</h3>
    {{ping}}
    <h3>tags:</h3>
    {{tags}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    hello: gql`{hello}`,
    ping: {
      query: gql`query PingMessage($message: String!) {
      ping(message: $message)
    }`,
      // 静态参数
      variables: {
        message: 'Meow',
      },
    },
    tags: {
      query: gql`query TagsType($type: String!) {
              tags(type: $type) {
                id label type
              }
            }`,
      // 静态参数
      variables: {
        type: 'City',
      },
    }
  }
}
</script>

<style>
</style>
