export default class Node {
  constructor(options) {
    this.id = options.id
    this.label = options.label
    this.checked = options.checked
    // 半选中
    this.checkHalf = false
    this.parent = options.parent || null
    this.level = options.parent ? options.parent.level + 1 : 0
    this.children = []
    this.data = options || {}
  }

  setParent(parent) {
    if (parent) {
      this.parent = parent
      this.level = parent.level + 1
    }
  }

  setChecked(checked) {
    this.checked = checked
    const handleDescendants = function(node, value) {
      node.checkHalf = false
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i]
          handleDescendants(child, value)
          child.checked = value
        }
      }
    }
    handleDescendants(this, checked)

    const checkSibling = (node) => {
      const siblings = node.parent.children
      const len = siblings.length
      let count = 0
      let checkAll = false
      let checkHalf = false
      let checkNone = false
      for (let i = 0; i < len; i++) {
        const sb = siblings[i]
        if (sb.checked) {
          count++
        }
        if (sb.checkHalf) {
          checkHalf = true
        }
      }
      if (count === len) {
        checkAll = true
      } else if (count === 0) {
        checkNone = true
      } else {
        checkHalf = true
      }
      if (checkHalf) checkNone = false
      return { checkAll, checkHalf, checkNone }
    }

    const handleParent = function(node) {
      if (node.parent) {
        const { checkAll, checkHalf, checkNone } = checkSibling(node)
        if (checkAll) {
          node.parent.checked = true
          node.parent.checkHalf = false
        }
        if (checkHalf) {
          node.parent.checkHalf = true
        }
        if (checkNone) {
          node.parent.checked = false
          node.parent.checkHalf = false
        }
        if (node.parent) {
          handleParent(node.parent)
        }
      }
    }
    handleParent(this)
  }
}
