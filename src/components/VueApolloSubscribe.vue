<template>
  <div class="subscribe-content">
    <h2>订阅：</h2>
    <input type="text" placeholder="label" v-model="label" />
    <input type="text" placeholder="type" v-model="typeAdd" />
    <button @click="addTagsPage">add tags</button>
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
  data() {
    return {
      type: 'City',
      label: '',
      typeAdd: ''
    }
  },
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
          id
          label
          type
        }
      }`,
      subscribeToMore: {
        document: gql`subscription tags($type: String!) {
          tagAdded(type: $type) {
            id
            label
            type
          }
        }`,
        variables() {
          return {
            type: this.type,
          }
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          if (previousResult.tags.find(tag => tag.id === subscriptionData.data.tagAdded.id)) {
            return previousResult
          }
          return {
            tags: [
              ...previousResult.tags,
              // 添加新的标签
              subscriptionData.data.tagAdded,
            ],
          }
        }
      },
      // Reactive variables
      variables() {
        return {
          type: this.type,
        };
      },
    }
  },
  methods: {
    addTagsPage() {
      this.$apollo.mutate({
        mutation: gql`mutation ($type: String!, $label: String!) {
          addTag(type: $type, label: $label) {
            type
            label
          }
        }`,
        // 参数
        variables: {
          type: this.typeAdd,
          label: this.label
        },
      })
    }
  }
}
</script>

<style>
</style>
