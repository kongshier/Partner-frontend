<!--
User:Shier
CreateTime:10:10
搜索结果界面
-->
<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="没有标签匹配的伙伴"/>
</template>

<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import myAxios from "../plugins/myAxios.ts";
  import qs from 'qs'
  import UserCardList from "../components/UserCardList.vue";

  const route = useRoute();
  const {tags} = route.query;

  //用户列表
  const userList = ref([]);

  // 加载
  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;
    // 为给定 ID 的 user 创建请求
    const userListData = await myAxios.get('/user/search/tags', {
      withCredentials: false,
      params: {
        tagNameList: tags
      },
      //序列化
      paramsSerializer: {
        serialize: params => qs.stringify(params, {indices: false}),
      },
    })
        .then(function (response) {
          console.log('/user/search/tags succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/search/tags error', error);
        });
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
    loading.value = false;
  })
</script>

<style scoped>

</style>

