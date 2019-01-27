<template>
  <div class="mutate-content">
    <h2>vue-apollo 变更：</h2>
    <input type="text" placeholder="enter tag" v-model="newTag" />
    <button @click="addTag">click to add tags</button>
    <h2>tags list:</h2>
    <div v-for="(item, index) in tags">
      <span>id: {{item.id}},</span>
      <span>label: {{item.label}}</span>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TAGS_QUERY from '@/graphql/TagsQuery.gql'
export default {
  data() {
    return {
      newTag: '',
      tags: []
    }
  },
  apollo: {
    tags: {
      query: gql`query tagList {
      tags {
        id,
        label
      }
    }`
    },
  },
  methods: {
    addTag() {
      // 保存用户输入以防止错误
      const newTag = this.newTag
      // 将其清除以尽早更新用户页面
      this.newTag = ''
      // 调用 apollo mutate
      this.$apollo.mutate({
        // 变更语句
        mutation: gql`mutation ($label: String!) {
          addTag(label: $label) {
            id
            label
          }
        }`,
        // 参数
        variables: {
          label: newTag,
        },
        update: (store, { data: { addTag } }) => {
          // 从缓存中读取这个查询的数据
          const data = store.readQuery({ query: TAGS_QUERY })
          data.tags.push(addTag)
          // 将数据写回缓存
          store.writeQuery({ query: TAGS_QUERY, data })
          console.log(data)
        },
        // 乐观 UI
        // 将在请求产生时作为“假”结果，使用户界面能够快速更新
        optimisticResponse: {
          __typename: 'Mutation',
          addTag: {
            __typename: 'Tag',
            id: -1,
            label: newTag,
          },
        }
      }).then(data => {
        // console.log(data)
      }).catch(err => {
        // console.log(err)
        this.newTag = newTag
      })
    }
  }
}
</script>

<style>
</style>
