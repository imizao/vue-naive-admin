<template>
  <div p-24>
    <div flex class="flex-box">
      <div flex style="align-items: center">
        你要修改的月份是：<n-date-picker
          :value-format="state.timestamp"
          type="month"
          clearable
          :on-confirm="(e) => getDataListFn(e)"
          :is-date-disabled="disablePreviousDate"
        />
      </div>
      <div flex>
        <n-button style="margin-right: 40px" type="primary" @click="handleCreate">保存</n-button>
        <n-button style="margin-right: 20px" type="primary" @click="handleCreate">审核</n-button>
      </div>
    </div>
    <div class="header">营业收入</div>
    <n-data-table
      mt-20
      :loading="state.loading"
      :scroll-x="1600"
      :data="state.operatingTableData"
      :columns="operatingData(operatingJson, state.operatingTableData)"
      :row-key="(row) => row.id"
    />
    <div class="header">净利润</div>
    <n-data-table
      mt-20
      :loading="state.loading"
      :scroll-x="1600"
      :data="state.netProfitTableData"
      :columns="operatingData(operatingJson, state.netProfitTableData)"
      :row-key="(row) => row.id"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { NInput, NDataTable, NEl } from 'naive-ui'
// import { returnData } from './return'
import { operatingJson, netProfitJson } from './data'
import { integrationTable, decouplingTable } from './useTable'
import { getDataList } from '@/api/user'
import dayjs from 'dayjs'

const state = reactive({
  loading: false,
  timestamp: '',
  operatingTableData: [],
  netProfitTableData: [],
})

onMounted(() => {
  init()
})
const getDataListFn = (e) => {
  let time = {
    yearsMonth: dayjs(e).format('YYYY-M'),
  }
  state.timestamp = time.yearsMonth
  getDataList(time).then((res) => {
    setAllData(res.data)
  })
}

const init = async () => {
  let time = {
    yearsMonth: dayjs().add(-1, 'month').startOf('month').format('YYYY-M'),
  }
  state.timestamp = time.yearsMonth
  let res = await getDataList(time)
  setAllData(res.data)
}

const setAllData = (data) => {
  // 营收收入
  {
    let table = integrationTable(operatingJson, data)
    state.operatingTableData = table
    operatingData(operatingJson, state.operatingTableData)
  }
  // 净利润
  {
    let table = integrationTable(netProfitJson, data)
    state.netProfitTableData = table
    operatingData(netProfitJson, state.netProfitTableData)
  }
}

const operatingData = (data, tableData) => {
  return data.columns.map((item) => {
    if (item.title == '') {
      return {
        title: '',
        render(row, index) {
          return h('span', {
            innerHTML: row.baseName,
          })
        },
      }
    }
    return {
      title: item.title,
      render(row, index) {
        return h(NInput, {
          value: row[item.key],
          onUpdateValue: (v) => {
            tableData[index][item.key] = Number(v)
          },
        })
      },
    }
  })
}

function handleCreate() {
  decouplingTable(operatingJson, state.operatingTableData)
  // let a = state.operatingTableData
  // console.log(a)
}
function disablePreviousDate(ts) {
  return ts > Date.now()
}
</script>

<style lang="scss" scoped>
.flex-box {
  justify-content: space-between;
}
.n-gradient-text {
  font-size: 16px;
  color: #333;
}
.header {
  height: 30px;
  background-color: #76e3e3;
  margin: 10px 0 0;
  color: #333;
  text-indent: 2em;
  line-height: 30px;
}
</style>