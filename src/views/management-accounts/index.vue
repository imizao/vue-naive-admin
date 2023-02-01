<template>
  <div p-24>
    <n-data-table :columns="state.columns" :data="state.data" :pagination="state.pagination" />
    <!-- style="width:1000px;height: 500px; overflow-y: auto" -->
    <n-modal style="width: 1000px" v-model:show="state.showModal" preset="dialog" closable="true" title="Dialog">
      <template #header>
        <div>标题</div>
      </template>
      <!-- <div>内容</div> -->
      <Home />
      <template #action>
        <n-button> 驳回 </n-button>
        <n-button type="primary"> 通过 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import Home from '@/views/dashboard/home.vue'
const message = useMessage()

const data = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
]
const createColumns = ({ play }) => {
  return [
    {
      title: '序号',
      key: 'no',
    },
    {
      title: '发起时间',
      key: 'title',
    },
    {
      title: '发起人员',
      key: 'length',
    },
    {
      title: '状态',
      key: 'length',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          'span',
          {
            strong: true,
            tertiary: true,
            size: 'small',
            style: 'cursor: pointer;color: #2098d7',
            onClick: () => play(row),
          },
          { default: () => '查看' }
        )
      },
    },
  ]
}
const state = reactive({
  data,
  columns: createColumns({
    play(row) {
      state.showModal = true
      //   message.info(`Play ${row.title}`)
      //   $dialog.confirm({
      //     title: `${row.title}`,
      //     type: 'info',
      //     content: home,
      //     confirm() {
      //       $message.success('已退出登录')
      //     },
      //   })
    },
  }),
  pagination: true,
  showModal: false,
})
</script>

<style lang="scss" scoped>
</style>