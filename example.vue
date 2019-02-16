<template>
  <div id="app">
    <!-- <router-view/> -->
    <check-tree-group :data="privilegeList"/>
  </div>
</template>

<script>

import checkTreeGroup from '@/components/CheckTreeGroup'

export default {
  name: 'App',
  components: {
    checkTreeGroup
  },
  data() {
    return {
      privilegeList: [
        {
          id: 1,
          label: '客户管理',
          checked: false,
          children: [
            {
              id: 11,
              label: '查询',
              checked: false
            },
            {
              id: 13,
              label: '添加',
              checked: false
            },
            {
              id: 14,
              label: '编辑',
              checked: false
            }
          ]
        },
        {
          id: 2,
          label: '系统管理',
          checked: false,
          children: [
            {
              id: 21,
              label: '岗位账号管理',
              checked: false,
              children: [
                {
                  id: 211,
                  label: '查询',
                  checked: false
                },
                {
                  id: 212,
                  label: '添加岗位',
                  checked: false
                },
                {
                  id: 2123,
                  label: '编辑岗位',
                  checked: false
                },
                {
                  id: 2121,
                  label: '账号详情',
                  children: [
                    {
                      id: 211111,
                      label: '激活/禁用'
                    },
                    {
                      id: 2126,
                      label: '重置密码'
                    }
                  ]
                }
              ]
            },
            {
              id: 22,
              label: '账号列表',
              children: [
                {
                  id: 2221,
                  label: '查询'
                },
                {
                  id: 2222,
                  label: '添加账号'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
