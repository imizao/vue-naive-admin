<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <!-- <img :src="userStore.avatar" mr10 w-35 h-35 rounded-full /> -->
      <span style="margin-right: 30px">{{ timestamp }}</span>
      <span style="margin-right: 20px">欢迎你，{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { renderIcon } from '@/utils/icon'
import dayjs from 'dayjs'

const userStore = useUserStore()
const timestamp = ref(null)

let time = ref(null)

clearInterval(time)

time = setInterval(()=> {
  timestamp.value = dayjs().format('YYYY-MM-DD HH:mm')
},1000)

const options = [
  // {
  //   label: '退出登录',
  //   key: 'logout',
  //   icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  // },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
}
</script>
