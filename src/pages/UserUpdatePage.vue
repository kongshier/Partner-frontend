<!--
User:Shier
CreateTime:11:01
用户信息修改界面
-->
<template>
  <template v-if="user">
    <van-cell-group inset>
      <van-divider/>
      <van-cell center title="头像" is-link to="/user/edit" :value="user.avatarUrl"
                @click="toEdit('avatarUrl','头像URL:',user.avatarUrl)">
        <img style="height: 48px" :src="user.avatarUrl">
      </van-cell>
      <van-divider/>
      <van-cell center title="昵称" is-link to="/user/edit" :value="user.username"
                @click="toEdit('username','昵称',user.username)"/>
      <van-divider/>
      <van-cell :value="user.profile" center is-link title="个人简介" to="/user/edit"
                @click="toEdit('profile', '个人简介', user.profile)"/>
      <van-divider/>
      <van-cell center title="账户" is-link to="/user/edit" :value="user.userAccount"
                @click="toEdit('userAccount','账户',user.userAccount)"/>
      <van-divider/>
      <van-cell center is-link title="修改标签" to="/user/editTags" @click="toEdit('tags', '标签', user.tags)"/>
      <van-divider/>
      <van-cell :value="user.gender===0? '男':'女'" center is-link title="性别"
                @click="showGenderEdit=true"/>
      <van-divider/>
      <van-cell center title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
      <van-divider/>
      <van-cell center title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
      <van-divider/>
    </van-cell-group>
    <van-dialog v-model:show="showGenderEdit" show-cancel-button title="性别" @confirm="doEditGender()">
      <van-row justify="center">
        <van-radio-group v-model="gender" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </van-row>
    </van-dialog>
  </template>
</template>
<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user";
  import {showFailToast, showSuccessToast} from "vant/lib/vant.es";
  import myAxios from "../plugins/myAxios";

  const user = ref();
  const router = useRouter()
  const showGenderEdit = ref(false);
  const gender = ref();
  // 编辑信息
  const toEdit = (editKey: String, editName: String, currentValue: String) => {
    if (editKey === 'tags') {
      if (currentValue == null) {
        currentValue = '';
      }
      router.push({
        path: '/user/editTags',
        query: {
          currentValue,
        }
      })
    } else {
      router.push({
        path: '/user/edit',
        query: {
          editKey,
          editName,
          currentValue,
        }
      })
    }
  }
  onMounted(async () => {
    // 获取到当前用户的信息
    user.value = await getCurrentUser();
  })
  const doEditGender = async () => {
    const res = await myAxios.post("/user/update", {
      'id': user.value.id,
      'gender': gender.value,
    })
    if (res.code === 0 && res.data > 0) {
      showSuccessToast("修改成功！");
      window.location.reload();
    } else {
      showFailToast("更新失败！");
    }
  }
</script>

<style scoped>

</style>