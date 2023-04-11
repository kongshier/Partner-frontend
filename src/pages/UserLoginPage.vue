<!--
User:Shier
CreateTime:20:34
用户登录界面
-->
<template>
  <van-row justify="center">
    <van-form @submit="onSubmit">
      <!-- 居中 -->
      <van-row justify="center">
        <van-image
            :src="friend"
            height="5rem"
            position="center"
            round
            width="5rem"/>
      </van-row>

      <van-row justify="center">
        <h3>寻找知己</h3>
      </van-row>
      <van-divider/>
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            :rules="[{ required: true, message: '请填写用户名' }]"
            label="账号"
            name="userAccount"
            placeholder="请输入账号"
        />
        <van-field
            v-model="userPassword"
            :rules="[{ required: true, message: '请填写密码' }]"
            label="密码"
            name="userPassword"
            placeholder="请输入密码"
            type="password"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">
          提交
        </van-button>
      </div>
      <van-divider/>
      <van-cell title="" to="/user/register" value="还没有账号？注册"></van-cell>
    </van-form>
  </van-row>
</template>

<script setup lang="ts">

import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/lib/vant.es";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import friend from "../assets/friend.png"

// 获取页面跳转
const router = useRouter();
// 获取页面数据
const route = useRoute();

const userAccount = ref();
const userPassword = ref();

const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  });
  console.log(res, '用户登录');
  if (res.code == 0 && res.data) {
    showSuccessToast('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    showFailToast("登录失败？账号不存在或者密码不正确!");
  }
};
</script>

<style scoped>

</style>
