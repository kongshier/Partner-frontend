<!--
User:Shier
CreateTime:11:20
-->
<template>
  <div>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
      <van-card
          :desc="user.profile"
          :title="`${user.username} (${user.planetCode})`"
          :thumb="user.avatarUrl"
      >
        <template #tags>
          标签：
          <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
        <template #bottom>
          {{ "邮箱：" + user.email }}<br>
          {{ "电话：" + user.phone }}
        </template>

        <template #footer>
          <van-button size="mini" @click="showUserDetail(user)">联系我</van-button>
        </template>
      </van-card>
    </van-skeleton>
    <van-popup v-model:show="show">
      <van-image :src="clickUser.avatarUrl"/>
      <van-divider/>
      <van-cell :value="clickUser.planetCode" center title="伙伴编号:"/>
      <van-cell :value="clickUser.profile" center title="伙伴简介:"/>
      <van-cell :value="popupText" center/>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
  import {UserType} from "../models/user";
  import {onMounted, ref} from "vue";

  interface UserCardListProps {
    loading: boolean,
    userList: UserType[];
  }

  const show = ref(false);
  const popupText = ref('');
  const clickUser = ref<UserType>();

  onMounted(() => {
    const userList = props.userList;
    if (userList) {
      userList.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
    }
  })

  const showUserDetail = (user: UserType) => {
    clickUser.value = user;
    if (user.id) {
      popupText.value = '电话：' + user.phone + "\t邮箱：" + user.email;
    } else {
      popupText.value = '暂无联系方式';
    }
    show.value = true;
  }

  // 给父组件设置默认值，保证数据不为空
  const props = withDefaults(defineProps<UserCardListProps>(), {
    loading: true,
    //@ts-ignore
    userList: [] as UserType[]
  });
</script>

<style scoped>


</style>