<template>
  <div p-24>
    <div flex class="flex-box">
      <!-- :value-format="state.timestamp" -->
      <div flex style="align-items: center">
        你要修改的月份是：<n-date-picker
          v-model:value="timestamp"
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
      :data="state.operatingTableData"
      :columns="operatingData(operatingJson, state.operatingTableData)"
      :row-key="(row) => row.id"
    />
    <div class="header">净利润</div>
    <n-data-table
      mt-20
      :loading="state.loading"
      :data="state.netProfitTableData"
      :columns="operatingData(netProfitJson, state.netProfitTableData)"
      :row-key="(row) => row.id"
    />
    <div class="header">资产负债</div>
    <n-data-table
      mt-20
      :loading="state.loading"
      :data="state.assetsAndLiabilitiesTableData1"
      :columns="operatingData(assetsAndLiabilitiesJson1, state.assetsAndLiabilitiesTableData1)"
      :row-key="(row) => row.id"
    />
    <n-data-table
      :loading="state.loading"
      :data="state.assetsAndLiabilitiesTableData2"
      :columns="operatingData(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2)"
      :row-key="(row) => row.id"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted,ref } from 'vue'
import { NInput, NDataTable, NEl } from 'naive-ui'
// import { returnData } from './return'
import { operatingJson, netProfitJson, assetsAndLiabilitiesJson1, assetsAndLiabilitiesJson2 } from './data'
import { integrationTable, decouplingTable } from './useTable'
import { getDataList,saveDataList } from '@/api/user'
import dayjs from 'dayjs'

const state = reactive({
  loading: false,
  operatingTableData: [],
  netProfitTableData: [],
  assetsAndLiabilitiesTableData1: [],
  assetsAndLiabilitiesTableData2: [],
})

let timestamp = ref(null)

onMounted(() => {
  init()
})
const getDataListFn = (e) => {
  let time = {
    yearsMonth: dayjs(e).format('YYYY-M'),
  }
  timestamp.value = dayjs(time.yearsMonth).$d
  getDataList(time).then((res) => {
    setAllData(res.data)
  })
}

const init = async () => {
  let time = {
    yearsMonth: dayjs().add(-1, 'month').startOf('month').format('YYYY-M'),
  }
  // console.log(dayjs(time.yearsMonth))
  timestamp.value = dayjs(time.yearsMonth).$d
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
  // 资产负债
  {
    let table = integrationTable(assetsAndLiabilitiesJson1, data)
    state.assetsAndLiabilitiesTableData1 = table
    operatingData(assetsAndLiabilitiesJson1, state.assetsAndLiabilitiesTableData1)
  }
  {
    let table = integrationTable(assetsAndLiabilitiesJson2, data)
    state.assetsAndLiabilitiesTableData2 = table
    operatingData(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2)
  }
}

const operatingData = (data, tableData) => {
  return data.columns.map((item) => {
    if (item.title == '') {
      return {
        title: '',
        render(row, index) {
          return h('div', {
            style: 'width: 200px;text-align: center',
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
          style: 'width: 150px',
          onUpdateValue: (v) => {
            tableData[index][item.key] = Number(v)
          },
        })
      },
    }
  })
}

const handleCreate = () => {
  let obj = {
    ...decouplingTable(operatingJson, state.operatingTableData),
    ...decouplingTable(netProfitJson, state.netProfitTableData),
    ...decouplingTable(assetsAndLiabilitiesJson1, state.assetsAndLiabilitiesTableData1),
    ...decouplingTable(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2),
    yearsMonth: dayjs(timestamp.value).format('YYYY-M')
  }
  // console.log(obj)
  // return 
  saveDataList(obj).then(res => {
    if (res.code == 0) {
      $message.success('保存成功')
    }
  })
  // let a = state.operatingTableData
  console.log(obj)
}
function disablePreviousDate(ts) {
  return ts > dayjs(dayjs().add(-1, 'month').startOf('month').format('YYYY-M')).$d
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
  background-color: #e1e1e1;
  margin: 10px 0 0;
  color: #333;
  text-indent: 2em;
  line-height: 30px;
}
</style>