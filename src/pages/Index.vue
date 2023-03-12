<!--
User:Shier
CreateTime:14:47
-->
<template>
  <van-cell center title="开启匹配伙伴">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="25"/>
    </template>
  </van-cell>
  <van-empty v-if="!userList || userList.length < 1" description="没有用户"/>
  <user-card-list :user-list="userList" :loading="loading"/>
</template>

<script setup lang="ts">
  import {ref, watchEffect} from "vue";
  import {showFailToast} from "vant/lib/vant.es";
  import myAxios from "../plugins/myAxios.ts";
  import UserCardList from "../components/UserCardList.vue";
  import {UserType} from "../models/user.d.ts";

  // 开关常量
  const isMatchMode = ref<boolean>(false);
  //用户列表
  const userList = ref([]);
  // 加载
  const loading = ref(true);

  /**
   * 加载数据
   */
  const loadData = async () => {
    let userListData;
    loading.value = true;
    // 心动模式，根据标签匹配用户
    if (isMatchMode.value) {
      const num = 5;
      userListData = await myAxios.get('/user/match', {
        params: {
          num,
        },
      }).then(function (response) {
        console.log('/user/match succeed', response);
        return response?.data;
      }).catch(function (error) {
        console.error('/user/match error', error);
        showFailToast('请求失败');
      })
    } else {
      // 普通模式，直接分页查询用户
      userListData = await myAxios.get('/user/recommend', {
        params: {
          pageSize: 8,
          pageNum: 1,
        },
      })
          .then(function (response) {
            console.log('/user/recommend succeed', response);
            return response?.data?.records;
          })
          .catch(function (error) {
            console.error('/user/recommend error', error);
            showFailToast('请求失败');
          })
    }
    if (userListData) {
      userListData.forEach((user: UserType) => {
        if (user.tags) {
          // todo 不显示用户列表
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
    loading.value = false;
  }
  // watchEffect钩子，每次开关都会触发
  watchEffect(() => {
    loadData();
  })

</script>

<style scoped>

</style>

