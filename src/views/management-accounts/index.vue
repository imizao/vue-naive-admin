<template>
  <div p-24>
    <n-data-table :columns="state.columns" :data="state.data" />
    <!-- :pagination="state.pagination" -->
    <br />
    <n-pagination
      v-model:page="state.pagination.page"
      :page-count="state.pagination.pageCount"
      :page-sizes="[10, 20, 50, 100]"
      show-size-picker
      :on-update:page="(page) => onChangePage(page)"
      :on-update:page-size="(pageSize) => onChangePageSize(pageSize)"
      style="message: 10px 0 0"
    />
    <!-- style="width:1000px;height: 500px; overflow-y: auto" -->
    <n-modal style="width: 1000px" v-model:show="state.showModal" preset="dialog" closable="true" title="Dialog">
      <template #header>
        <div>{{ state.dialogTitle }}</div>
      </template>
      <!-- <div>内容</div> -->
      <n-tabs type="line" animated @update:value="onChangeTabs">
        <n-tab-pane name="detail" tab="详情">
          <div>经营总览专题：{{ state.dataDate }}</div>
          <Home />
          <div v-if="state.dialogTitle != '待审核'">审核意见：{{ state.auditRemakReturn }}</div>
          <div v-if="state.dialogTitle == '待审核'">
            审核意见：<n-input v-model:value="state.auditRemak" type="textarea" placeholder="请填写审核意见" />
          </div>
        </n-tab-pane>
        <n-tab-pane name="timeline" tab="流程记录">
          <n-timeline>
            <n-timeline-item
              type="info"
              v-for="item in state.timelineList"
              :title="item.nodeName"
              :content="`操作人员：${item.createName} ${
                item.statusOpName ? `审核结果：${item.statusOpName}` : ''
              } 耗时：${item.timeConsuming}`"
              :time="`操作时间：${item.createTime}`"
              :key="item.id"
            />
            
          </n-timeline>
        </n-tab-pane>
      </n-tabs>

      <template #action v-if="state.isShowActive">
        <n-button v-if="state.dialogTitle == '待审核' && proxy.$hasPermission('business:special_inquiry:process_record_update_bh')" @click="processRecordUpdateBhFn" type="primary"> 驳回 </n-button>
        <n-button v-if="state.dialogTitle == '待审核' && proxy.$hasPermission('business:special_inquiry:process_record_update_tg')" @click="processRecordUpdateTgFn" type="primary"> 通过 </n-button>
        <n-button v-if="state.dialogTitle == '被驳回' && proxy.$hasPermission('business:special_inquiry:process_record_update_gb')" @click="processRecordUpdateGbFn" type="primary">
          关闭流程
        </n-button>
        <n-button v-if="state.dialogTitle == '被驳回'" @click="processRecordUpdateTgFn" type="primary">
          重新提交
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { h, onMounted, ref, reactive, watch, getCurrentInstance } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import Home from '@/views/dashboard/home.vue'
import {
  manageRecordPage,
  processRecordList,
  processRecordUpdateBh,
  processRecordUpdateTg,
  processRecordUpdateGb,
} from '@/api/user'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const message = useMessage()
const { proxy } = getCurrentInstance()


const createColumns = ({ play }) => {
  return [
    {
      title: '序号',
      key: 'xh',
    },
    {
      title: '发起时间',
      key: 'createTime',
    },
    {
      title: '发起人员',
      key: 'createName',
    },
    {
      title: '状态',
      key: 'auditStatusName',
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

const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  // itemCount: 0,
  pageCount: 0,
  showSizePicker: true,
  showQuickJumper: true,
  pageSizes: [5, 10, 20, 50],
  onChange: (page) => {
    paginationReactive.page = page
    manageRecordPageFn()
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
    manageRecordPageFn()
  },
})

const onChangePage = (page) => {
  paginationReactive.page = page
  manageRecordPageFn()
}
const onChangePageSize = (pageSize) => {
  paginationReactive.pageSize = pageSize
  paginationReactive.page = 1
  manageRecordPageFn()
}

const state = reactive({
  data: [],
  dialogTitle: '',
  dataDate: '',
  auditRemak: '',
  auditRemakReturn: '',
  timelineList: [],
  columns: createColumns({
    play(row) {
      state.dialogTitle = row.auditStatusName
      state.dataDate = row.dataDate
      state.auditRemakReturn = row.auditRemak
      // userStore.setIsAccounts(true)
      userStore.setAccountsId(row.id)
      state.showModal = true
     
    },
  }),
  pagination: paginationReactive,
  showModal: false,
  isShowActive: true,
})

watch(
  () => state.showModal,
  (value, oldValue) => {
    if (!value) {
      // setTimeout(()=> {
      //   userStore.setIsAccounts(false)
      // },1000)
      userStore.setIsAccounts(false)
    } else {
      userStore.setIsAccounts(true)
      processRecordListFn()
      state.auditRemak = ''
    }
    console.log(value, oldValue)
  }
)

onMounted(() => {
  init()
})

const init = () => {
  manageRecordPageFn()
}

const manageRecordPageFn = async () => {
  let parame = {
    page: paginationReactive.page,
    limit: paginationReactive.pageSize,
  }
  let res = await manageRecordPage(parame)
  if (res.code == 0) {
    state.data = res.data.records
    // paginationReactive.itemCount = Number(res.data.total)
    paginationReactive.pageCount = Number(res.data.pages)
  }
  // console.log(res)
}

const onChangeTabs = (val) => {
  // console.log(val)
  if (val == 'timeline') {
    state.isShowActive = false
  } else {
    state.isShowActive = true
  }
}

const processRecordUpdateBhFn = async () => {
  let parame = {
    id: userStore.accountsId,
    auditRemak: state.auditRemak,
  }
  let res = await processRecordUpdateBh(parame)
  if (res.code == 0) {
    $message.success('驳回成功')
    state.showModal = false
    init()
  } else {
    $message.error(res.msg)
  }
  // console.log(res)
}
const processRecordUpdateTgFn = async () => {
  let parame = {
    id: userStore.accountsId,
    auditRemak: state.auditRemak,
  }
  let res = await processRecordUpdateTg(parame)
  if (res.code == 0) {
    $message.success('已通过！')
    state.showModal = false
    init()
  } else {
    $message.error(res.msg)
  }
  // console.log(res)
}
const processRecordUpdateGbFn = async () => {
  let parame = {
    id: userStore.accountsId,
  }
  let res = await processRecordUpdateGb(parame)
  if (res.code == 0) {
    $message.success('关闭成功！')
    state.showModal = false
    init()
  } else {
    $message.error(res.msg)
  }
  // console.log(res)
}
const processRecordListFn = async () => {
  let parame = {
    dataUpdateLogId: userStore.accountsId,
  }
  let res = await processRecordList(parame)
  // console.log(res)
  if (res.code == 0) {
    state.timelineList = res.data
  } else {
    $message.error(res.msg)
  }
  console.log(res)
}
</script>

<style lang="scss" scoped>
</style>