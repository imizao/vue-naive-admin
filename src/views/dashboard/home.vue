<template>
  <div p-24>
    <div flex class="flex-box" v-if="!isAccounts">
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
        <n-button style="margin-right: 40px" type="primary" @click="handleSave">保存草稿</n-button>
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
    <!-- <n-data-table
      :loading="state.loading"
      :data="state.assetsAndLiabilitiesTableData2"
      :columns="operatingData(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2)"
      :row-key="(row) => row.id"
    /> -->
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
import { reactive, onMounted, ref } from 'vue'
import { NInput, NInputNumber, NDataTable, NButton } from 'naive-ui'
import {
  operatingJson,
  netProfitJson,
  assetsAndLiabilitiesJson1,
  // assetsAndLiabilitiesJson2,
  investmentAnalysisJson1,
  investmentAnalysisJson2,
} from './data'
import { integrationTable, decouplingTable, checkKeysDuplicate } from './useTable'
import { getDataList, saveDataList, saveDraft, saveCockpit, searchBusiness } from '@/api/user'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const state = reactive({
  loading: false,
  isCheck: false,
  // editDataList: {},
  // draftDtoReturn: {},
  operatingTableData: [],
  netProfitTableData: [],
  assetsAndLiabilitiesTableData1: [],
  assetsAndLiabilitiesTableData2: [],
  investmentAnalysisTableData1: [],
  investmentAnalysisTableData2: [],
})

let timestamp = ref(null)
let isAccounts = ref(userStore.isAccounts)
userStore.$subscribe((mutation, state) => {
  // debugger
  isAccounts.value = state.isAccounts
})
onMounted(() => {
  init()
  // console.log(isAccounts)
})

const init = async () => {
  let res = {}
  if (!isAccounts.value) {
    let time = {
      yearsMonth: dayjs().add(-1, 'month').startOf('month').format('YYYY-MM'),
      // yearsMonth: '2022-12',
    }
    timestamp.value = dayjs(time.yearsMonth).$d
    res = await getDataList(time)
  } else {
    let parame = {
      id: userStore.accountsId,
    }
    res = await searchBusiness(parame)
  }
  // if (res.data.draftDto) {
  //   state.draftDtoReturn = res.data.draftDto
  // }
  setAllData(res.data)
}
const getDataListFn = (e) => {
  let time = {
    yearsMonth: dayjs(e).format('YYYY-MM'),
  }
  timestamp.value = dayjs(time.yearsMonth).$d
  getDataList(time).then((res) => {
    // if (res.data.draftDto) {
    //   state.draftDtoReturn = res.data.draftDto
    // }
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
  // {
  //   let table = integrationTable(assetsAndLiabilitiesJson2, data)
  //   state.assetsAndLiabilitiesTableData2 = table
  //   operatingData(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2)
  // }
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
            style: 'width: 100px;text-align: center',
            innerHTML: row.baseNameFrontEnd,
          })
        },
      }
    }
    if (isAccounts.value) {
      return {
        title: item.title,
        render(row, index) {
          return h(
            NButton,
            {
              ghost: true,
              showButton: false,
              focusable: false,
              // style: item.key == 'remark' ? 'width: auto' : 'width: 100px',
              type: row[`${item.key}Status`] ? 'error' : '',
            },
            row[item.key]
            // row[item.key]?row[item.key]:'--'
          )
        },
      }
    }

    return {
      title: item.title,
      render(row, index) {
        return h(item.key == 'remark' ? NInput : NInputNumber, {
          showButton: false,
          value: row[item.key],
          style: item.key == 'remark' ? 'width: auto' : 'width: 100px',
          // disabled: !isAccounts.value,
          status: row[`${item.key}Status`] ? 'error' : 'success',
          onUpdateValue: (v) => {
            tableData[index][item.key] = v
            tableData[index][`${item.key}Status`] = true
            if (!tableData[index]['editKeys']) {
              tableData[index]['editKeys'] = ''
            }
            // debugger
            tableData[index]['editKeys'] = checkKeysDuplicate(tableData[index]['editKeys'], item.key)
              ? tableData[index]['editKeys']
              : tableData[index]['editKeys']
              ? `${tableData[index]['editKeys']},${item.key}`
              : item.key

            let obj = {}
            obj[`${tableData[index]['parentNameFrontEnd']}`] = tableData[index]
            userStore.setHomeEditDataObj(obj)
            // state.editDataList = {
            //   ...state.editDataList,
            //   ...obj,
            // }

            // console.log(state.editDataList)
            // console.log(tableData[index])
            console.log(tableData[index]['editKeys'])
          },
        })
      },
    }
  })
}

const stateParameterObj = () => {
  // console.log(userStore.homeEditDataObj)
  let editDataObj = userStore.homeEditDataObj
  let obj = {}

  for (let key in editDataObj) {
    let keyArr = editDataObj[key].editKeys.split(',')
    keyArr.forEach((i) => {
      let aObj = {}
      aObj[i] = editDataObj[key][i]
      obj[key] = {
        ...obj[key],
        ...aObj,
      }
    })
  }
  return obj
}

const handleSave = async () => {
  let parame = {
    dataDate: dayjs(timestamp.value).format('YYYY-MM'),
    createName: '陈洁',
    afterJson: JSON.stringify(stateParameterObj()),
  }
  // console.log(parame)
  let res = await saveDraft(parame)
  if (res.code == 0) {
    state.isCheck = true
    $message.success('保存成功!')
  } else {
    $message.error('保存失败!')
  }
}

const handleCreate = async () => {
  // if (!state.isCheck) return $message.warning('请先保存草稿！')
  let parame = {
    dataDate: dayjs(timestamp.value).format('YYYY-MM'),
    createName: '陈洁',
    afterJson: JSON.stringify(stateParameterObj()),
  }
  // console.log(parame)
  let res = await saveCockpit(parame)
  if (res.code == 0) {
    $message.success('提交成功!')
  } else {
    $message.error('提交失败!')
  }
  state.isCheck = false
}
const handleSaveOld = () => {
  state.isCheck = true
  $message.success('保存成功!')
}

const handleCreateOld = () => {
  if (!state.isCheck) return $message.warning('请先保存信息！')
  let obj = {
    ...decouplingTable(operatingJson, state.operatingTableData),
    ...decouplingTable(netProfitJson, state.netProfitTableData),
    ...decouplingTable(assetsAndLiabilitiesJson1, state.assetsAndLiabilitiesTableData1),
    // ...decouplingTable(assetsAndLiabilitiesJson2, state.assetsAndLiabilitiesTableData2),
    ...decouplingTable(investmentAnalysisJson1, state.investmentAnalysisTableData1),
    ...decouplingTable(investmentAnalysisJson2, state.investmentAnalysisTableData2),
    yearsMonth: dayjs(timestamp.value).format('YYYY-MM'),
  }
  saveDataList(obj).then((res) => {
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