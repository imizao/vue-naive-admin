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
      :data="state.tableData"
      :columns="operatingData()"
      :row-key="(row) => row.id"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
// import { usePostTable } from './usePostTable'
import { NInput, NDataTable, NEl } from 'naive-ui'
import { returnData } from './return'
import { data } from './data'
import { integrationTable } from './useTable'
import { getDataList } from '@/api/user'
import dayjs from 'dayjs'
import console from 'console'

// const createData = () => [
//   {
//     key: 0,
//     name: "John Brown",
//     age: "32",
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: 1,
//     name: "Jim Green",
//     age: "42",
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: 2,
//     name: "Joe Black",
//     age: "32",
//     address: "Sidney No. 1 Lake Park",
//   },
// ];
const state = reactive({
  loading: false,
  timestamp: '',
  // tableData: createData(),
  tableData: [],
})

onMounted(() => {
  init()
  // console.log(returnData)
  // console.log(data)
})
const getDataListFn =(e) => {
  let time = {
    yearsMonth: dayjs(e).format('YYYY-M')
  }
  state.timestamp = time.yearsMonth
  debugger
  getDataList(time).then((res) => {
    let table = integrationTable(data, res.data)
    state.tableData = table
    operatingData()
  })
}
const init = async () => {
  let time = {
    yearsMonth: dayjs().add(-1, 'month').startOf('month').format('YYYY-M'),
  }
  state.timestamp = time.yearsMonth

  let rData = await getDataList(time)

  let table = integrationTable(data, rData.data)
  state.tableData = table
  operatingData()
}
const operatingData = () => {
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
            state.tableData[index][item.key] = Number(v);
          },
        })
      },
    }
  })

  // let a = createColumns()
  // console.log(a)
}

// const createColumns = () => [
//       {
//         title:'',
//         render(row, index) {
//           return h('span', {
//             innerHTML: row.name
//           })
//         }
//       },
//       {
//         title: "本年计划(亿元)",
//         render(row, index) {
//           return h(NInput, {
//             value: row.name,
//             onUpdateValue(v) {
//               state.tableData[index].name = v;
//             }
//           });
//         }
//       },
//       {
//         title: "本月完成(亿元)",
//         render(row, index) {
//           return h(NInput, {
//             value: row.age,
//             onUpdateValue(v) {
//               state.tableData[index].age = v;
//             }
//           });
//         }
//       },
//       {
//         title: "本年完成(亿元)",
//         render(row, index) {
//           return h(NInput, {
//             value: row.address,
//             onUpdateValue(v) {
//               state.tableData[index].address = v;
//             }
//           });
//         }
//       }
//     ];

function handleCreate() {
  let a = state.tableData
  debugger
  // console.log()
  
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