<!--
User:Shier
CreateTime:11:01
用户个人界面
-->
<template>
  <template v-if="user">
    <van-cell title="昵称" :value="user?.username" />
    <van-cell title="账号" :value="user?.userAccount" />
    <van-cell title="编号" :value="user?.planetCode" />
    <van-cell title="电话" :value="user?.phone" />
    <van-cell title="邮箱" :value="user?.email" />
    <van-cell title="头像" :value="user.avatarUrl">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="个人信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>
<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user";

  const user = ref();
  const router = useRouter()

  onMounted(async () => {
    // 获取到当前用户的信息
    user.value = await getCurrentUser();
  })
</script>

<style scoped>

</style>