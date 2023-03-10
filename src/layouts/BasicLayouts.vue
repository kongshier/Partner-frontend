<!--
User:Shier
CreateTime:14:04
最外层界面
-->
<template>
  <van-nav-bar
      :title="title"
      :left-arrow="leftArrow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
  import 'vant/es/toast/style'
  import {useRouter} from "vue-router"
  import routes from "../config/route.ts";

  import {ref} from "vue";

  const router = useRouter()
  const DEFAULT_TITLE = '寻找知己';
  const title = ref(DEFAULT_TITLE);
  const leftArrow = ref(true);

  /**
   * 根据路由切换标题
   */
  router.beforeEach((to, from) => {
    const toPath = to.path;
    const route = routes.find((route) => {
      return toPath == route.path;
    })
    title.value = route?.title ?? DEFAULT_TITLE;
    if (toPath === '/' || toPath === '/team' || toPath === '/user') {
      leftArrow.value = false;
    } else {
      leftArrow.value = true;
    }
    if (toPath === '/user') {
      leftArrow.value = false;
    } else {
      leftArrow.value = true;
    }
  })

  // 返回上一个界面
  const onClickLeft = () => {
    router.back()
  };
  // 搜索界面
  const onClickRight = () => {
    router.push('/search')
  };

</script>

<style scoped>
  #content {
    padding-bottom: 50px;
  }
</style>