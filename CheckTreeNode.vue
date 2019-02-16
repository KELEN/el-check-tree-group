<template>
  <div :class="[ isButton ? 'block-child' : 'child-inline' ]">
    <check-button v-model="node.checked" :label="node.label" :level="node.level" :is-button="!node.children || node.children.length === 0" :indeterminate="node.checkHalf" @change="checkChange(node)"/>
    <check-tree-node v-for="node in node.children" :node="node" :key="node.id" />
  </div>
</template>

<script>

import CheckButton from './CheckButton'

export default {
  name: 'CheckTreeNode',
  components: {
    CheckButton
  },
  props: {
    node: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isButton() {
      return !!this.node.children.length
    }
  },
  methods: {
    checkChange(node) {
      node.setChecked(node.checked)
    }
  }
}
</script>
<style lang="scss" scoped>
.child-inline {
  display: inline-block;
}
.block-child .check-wrap {
  display: block;
}
</style>
