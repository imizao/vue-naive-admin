<template>
  <div p-24>
    <div flex class="flex-box">
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
        <n-button style="margin-right: 40px" type="primary" @click="handleSave">保存</n-button>
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
    <div class="header">投资分析</div>
    <n-data-table
      mt-20
      :loading="state.loading"
      :data="state.investmentAnalysisTableData1"
      :columns="operatingData(investmentAnalysisJson1, state.investmentAnalysisTableData1)"
      :row-key="(row) => row.id"
    />
    <n-data-table
      :loading="state.loading"
      :data="state.investmentAnalysisTableData2"
      :columns="operatingData(investmentAnalysisJson2, state.investmentAnalysisTableData2)"
      :row-key="(row) => row.id"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted,ref } from 'vue'
import { NInput, NInputNumber,NDataTable } from 'naive-ui'
import { operatingJson, netProfitJson, assetsAndLiabilitiesJson1, assetsAndLiabilitiesJson2, investmentAnalysisJson1, investmentAnalysisJson2 } from './data'
import { integrationTable, decouplingTable } from './useTable'
import { getDataList,saveDataList } from '@/api/user'
import dayjs from 'dayjs'

const state = reactive({
  loading: false,
  isCheck: false,
  operatingTableData: [],
  netProfitTableData: [],
  assetsAndLiabilitiesTableData1: [],
  assetsAndLiabilitiesTableData2: [],
  investmentAnalysisTableData1: [],
  investmentAnalysisTableData2: [],
})

let timestamp = ref(null)

onMounted(() => {
  init()
})

const init = async () => {
  let time = {
    yearsMonth: dayjs().add(-1, 'month').startOf('month').format('YYYY-MM'),
  }
  timestamp.value = dayjs(time.yearsMonth).$d
  let res = await getDataList(time)
  setAllData(res.data)
}
const getDataListFn = (e) => {
  let time = {
    yearsMonth: dayjs(e).format('YYYY-MM'),
  }
  timestamp.value = dayjs(time.yearsMonth).$d
  getDataList(time).then((res) => {
    setAllData(res.data)
  })
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
  // 投资分析
  {
    let table = integrationTable(investmentAnalysisJson1, data)
    state.investmentAnalysisTableData1 = table
    operatingData(investmentAnalysisJson1, state.investmentAnalysisTableData1)
  }
  {
    let table = integrationTable(investmentAnalysisJson2, data)
    state.investmentAnalysisTableData2 = table
    operatingData(investmentAnalysisJson2, state.investmentAnalysisTableData2)
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
        return h(NInputNumber, {
          showButton: false,
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
const handleSave = () => {
  state.isCheck = true
  $message.success('保存成功!')
}

const handleCreate = () => {
  // if (!state.isCheck) return $message.warning('请先提交审核！')
  if (!state.isCheck) return $message.warning('请先保存信息！')
  let obj = {
    ...decouplingTable(operatingJson, state.operatingTableData),
    ...decouplingTable(netProfitJson, state.netProfitTableData),
    ...decouplingTable(assetsAndLiabilitiesJson1, state.assetsAndLiabilitiesTableData1),
    ...decouplingTable(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2),
    ...decouplingTable(investmentAnalysisJson1, state.investmentAnalysisTableData1),
    ...decouplingTable(investmentAnalysisJson2, state.investmentAnalysisTableData2),
    yearsMonth: dayjs(timestamp.value).format('YYYY-MM')
  }
  saveDataList(obj).then(res => {
    if (res.code == 0) {
      $message.success('审核成功!')
    }
  })
  state.isCheck = false
  // console.log(obj)
}
function disablePreviousDate(ts) {
  return ts > dayjs(dayjs().add(-1, 'month').startOf('month').format('YYYY-MM')).$d
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