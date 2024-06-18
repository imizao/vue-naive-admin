<template>
  <div >
    
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, getCurrentInstance } from 'vue'
import { NInput, NInputNumber, NDataTable, NButton } from 'naive-ui'
import { getDataList, saveDataList, saveDraft, saveCockpit, searchBusiness } from '@/api/user'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const { proxy } = getCurrentInstance()
const state = reactive({
  loading: false,
  isCheck: false,
  
})

let timestamp = ref(null)
let isAccounts = ref(userStore.isAccounts)
userStore.$subscribe((mutation, state) => {
  isAccounts.value = state.isAccounts
})
onMounted(() => {
  init()
})

const init = async () => {
}


</script>

<style lang="scss" scoped>
.flex-box {
  justify-content: space-between;
}

</style>