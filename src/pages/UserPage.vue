<!--
User:Shier
CreateTime:11:01
用户个人界面
-->
<template>
  <template v-if="user">
    <van-cell to="/user/update">
      <van-card
          :title="user?.username"
          :desc="user.profile"
          :thumb="user.avatarUrl"
      >
        <template #tags>
          <van-tag v-for="tag in user.tags" plain style="margin: 8px" type="primary">{{
              tag
            }}
          </van-tag>
        </template>
      </van-card>
    </van-cell>
    <van-divider/>
    <van-cell center title="编号" :value="user?.planetCode">
      <template #icon>
        <van-icon name="manager" size="18" style="margin-right: 5px;"/>
      </template>
    </van-cell>
    <van-divider/>
    <van-cell center title="我的队伍" is-link to="/user/team/create">
      <template #icon>
        <van-icon name="like" size="18" style="margin-right: 5px;"/>
      </template>
    </van-cell>
    <van-divider/>
    <van-cell center title="加入队伍" is-link to="/user/team/join">
      <template #icon>
        <van-icon name="friends" size="18" style="margin-right: 5px;"/>
      </template>
    </van-cell>
    <van-divider/>
    <van-cell title="注册时间" :value="user.createTime" center>
      <template #icon>
        <van-icon name="clock" size="18" style="margin-right: 5px;"/>
      </template>
    </van-cell>
    <van-divider/>
    <van-cell center title="退出登录" @click="quit">
      <template #icon>
        <van-icon name="clear" size="18" style="margin-right: 5px;"/>
      </template>
    </van-cell>
  </template>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant/lib/vant.es";

const user = ref();
const router = useRouter()

onMounted(async () => {
  // 获取到当前用户的信息
  user.value = await getCurrentUser();
  if (user.value.tags) {
    user.value.tags = JSON.parse(user.value.tags);
  }
})
const quit = async () => {
  const res = await myAxios.post("/user/logout");
  if (res.code === 0) {
    showSuccessToast("退出成功！");
    await router.push({
      path: '/user/login',
    })
  }
}

</script>

<style scoped>
:root {
  --van-card-font-size: 10px;
}
</style>