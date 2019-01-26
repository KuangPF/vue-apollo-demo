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
      console.log(gql`query tagList {
      tags {
        id,
        label
      }
    }`)
    console.log(TAGS_QUERY)
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
           const data = store.readQuery({ query: TAGS_QUERY })
           console.log(data)
         }
      }).then(data=> {
        // console.log(data)
      }).catch(err=> {
        // console.log(err)
        this.newTag = newTag
      })
    }
  }
}
</script>

<style>
</style>
