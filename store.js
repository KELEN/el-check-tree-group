export default class Store {
  constructor(tree) {
    this.nodeMap = {}
    this.tree2nodeMap(tree)
  }
  tree2nodeMap(tree) {
    tree.forEach(t => {
      this.nodeMap[t.id] = t
      if (Array.isArray(t.children)) {
        this.tree2nodeMap(t.children)
      }
    })
  }
  getChecked() {
    const checked = []
    for (const key in this.nodeMap) {
      if (this.nodeMap.hasOwnProperty(key) && (this.nodeMap[key]['checked'])) {
        checked.push(key)
      }
    }
    return checked
  }
}
