<!--
User:Shier
CreateTime:11:01
用户信息修改界面
-->
<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账户" is-link to="/user/edit" :value="user.userAccount"
              @click="toEdit('userAccount','账户',user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" :value="user.avatarUrl"
              @click="toEdit('avatarUrl','头像URL:',user.avatarUrl)">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>
<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user";

  const user = ref();
  const router = useRouter()
  // 编辑信息
  const toEdit = (editKey: String, editName: String, currentValue: String) => {
    router.push({
      path: '/user/edit',
      query: {
        editKey,
        editName,
        currentValue,
      }
    })
  }
  onMounted(async () => {
    // 获取到当前用户的信息
    user.value = await getCurrentUser();
  })
</script>

<style scoped>

</style>