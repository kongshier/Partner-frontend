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
        <van-row justify="center">
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
        </van-row>
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
        <van-field
            v-model="checkPassword"
            :rules="[{ required: true, message: '请再次输入密码!' }]"
            label="确认密码"
            name="checkPassword"
            placeholder="请再次输入密码"
            type="password"
        />
        <van-field
            v-model="planetCode"
            :rules="[{ required: true, message: '请输入编号！' }]"
            label="编号"
            name="planetCode"
            placeholder="请输入编号"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">
          提交
        </van-button>
      </div>

    </van-form>
  </van-row>


</template>

<script lang="ts" setup>
  import {useRoute, useRouter} from "vue-router";
  import {ref} from 'vue';
  import myAxios from "../plugins/myAxios";
  import {showFailToast, showSuccessToast} from "vant/lib/vant.es";
  import friend from '../assets/logo.png';

  const router = useRouter();
  const route = useRoute();
  const userAccount = ref('');
  const userPassword = ref('');
  const checkPassword = ref('');
  const planetCode = ref('');
  const avatarUrl = ref('');
  const fileList = ref([]);
  const avatar = ref();

  const onSubmit = async () => {
    // showSuccessToast.loading("注册中");
    const uploadRes = await myAxios.post("/fileOss/upload", {
      'file': avatar.value
    }, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    avatarUrl.value = uploadRes.data;

    const res = await myAxios.post("/user/register", {
      userAccount: userAccount.value,
      userPassword: userPassword.value,
      checkPassword: checkPassword.value,
      planetCode: planetCode.value,
      avatarUrl: avatarUrl.value,
    })
    // console.log(res)
    if (res.code === 0 && res.data) {
      showSuccessToast("注册成功！");
      window.location.href = '/user/login';
      // router.replace("/");
    } else {
      showFailToast("注册失败！" + res.description);
    }
  };
  const afterRead = async (file) => {
    // console.log(file.file);
    const fileFile = file.file;
    avatar.value = fileFile;
    // 此时可以自行将文件上传至服务器
    // console.log(res);
  };

</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
