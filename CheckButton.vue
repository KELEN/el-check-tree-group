<template>
  <div :style="{ marginLeft: 30 * level + 'px' }" class="check-wrap">
    <label>
      <el-button v-if="isButton" :type="btnChecked" class="check-btn" size="small" @click="btnCheck">{{ label }}</el-button>
      <el-checkbox v-else ref="cb" :label="label" v-model="model" :indeterminate="indeterminate" class="check-group-title" type="checkbox" @change="checkChange" />
    </label>
  </div>
</template>
<script>
export default {
  name: 'CheckButtond',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    // 半选中
    indeterminate: {
      type: Boolean,
      default: false
    },
    // 是否是按钮形式的checkbox
    isButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnChecked() {
      return this.model ? 'primary' : ''
    },
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    btnCheck() {
      // console.log(!this.model)
      this.$emit('input', !this.model)
      this.$emit('change')
    },
    checkChange() {
      this.$emit('change')
    }
  }
}
</script>
<style lang="scss" scoped>
.check-wrap {
  margin: 18px 0;
  .check-btn {
    padding: 8px 24px;
  }
  .check-group-title {
    font-weight: bolder;
  }
}
.child-inline > .check-wrap {
  margin: 0;
}
</style>

