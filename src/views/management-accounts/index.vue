<template>
  <div p-24>
    <n-data-table :columns="state.columns" :data="state.data" :pagination="state.pagination" />
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
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
      message.info(`Play ${row.title}`)
    },
  }),
  pagination: true,
})
</script>

<style lang="scss" scoped>
</style>