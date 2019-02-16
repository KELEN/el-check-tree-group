<template>
  <div class="check-group">
    <div v-for="node in treeData" :key="node.id">
      <check-tree-node :node="node" :key="node.id"/>
    </div>
  </div>
</template>
<script>

import CheckTreeNode from './CheckTreeNode.vue'
import Node from './node'
import Store from './store'
export default {
  name: 'CheckTreeGroup',
  components: {
    CheckTreeNode
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 选中的ids
    checkedIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      treeData: []
    }
  },
  watch: {
    data() {
      this.initData()
    },
    checkedIds() {
      this.setDefaultChecked()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    /**
     * 初始化树形数据
     */
    initData() {
      const constructTreeData = (data, parent) => {
        const arr = []
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            const child = data[i]
            const node = new Node(child)
            node.setParent(parent)
            if (child.children) {
              node.children = constructTreeData(child.children, node)
            }
            arr.push(node)
          }
        }
        return arr
      }
      this.treeData = constructTreeData(this.data, null)
      this.storeIns = new Store(this.treeData)
      this.setDefaultChecked()
    },
    /**
     *  设置默认选中
     */
    setDefaultChecked() {
      if (this.checkedIds.length) {
        this.checkedIds.forEach(id => {
          if (this.storeIns.nodeMap[id]) {
            this.storeIns.nodeMap[id].setChecked(true)
          }
        })
      }
    },
    /**
     * 获取选中的数据
     */
    getData() {
      const getData = (treeData) => {
        const arr = []
        treeData.forEach(item => {
          const checkObject = item.data
          if (Array.isArray(item.children) && item.children.length) {
            checkObject.children = getData(item.children)
          }
          if (item.checked || item.checkHalf) {
            arr.push(checkObject)
          }
        })
        return arr
      }
      console.log(this.storeIns.getChecked())
      return getData(this.treeData)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-level-space {
  display: inline-block;
  width: 8px;
  height: 16px;
}
</style>
