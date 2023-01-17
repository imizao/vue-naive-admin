<template>
  <header px-15 h-full flex items-center>
    <div flex items-center>
      <!-- <MenuCollapse /> -->
      <!-- <BreadCrumb ml-15 /> -->
      <div style="color:#e1b870">领导驾驶舱数据管理系统</div>
    </div>
    <div ml-auto flex items-center>
      <!-- <GithubSite />
      <FullScreen /> -->
      <UserAvatar />
    </div>
  </header>
</template>

<script setup>
import BreadCrumb from './components/BreadCrumb.vue'
import MenuCollapse from './components/MenuCollapse.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import GithubSite from './components/GithubSite.vue'
</script>
