<!--
User:Shier
CreateTime:14:47
在个人信息页中的创建队伍
-->
<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <div style="margin-bottom: 10px"/>
    <van-button class="add-button"  icon="plus" type="primary" @click="doJoinTeam"></van-button>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length<1" description="暂无你创建的队伍"/>
  </div>
</template>

<script setup lang="ts">
  import {useRouter} from "vue-router";
  import TeamCardList from "../components/TeamCardList.vue";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios";
  import {showFailToast, showSuccessToast} from "vant/lib/vant.es";

  const router = useRouter()

  // 搜索默认为空
  const searchText = ref('')

  // 跳转创建队伍页面
  const doJoinTeam = () => {
    router.push({
      path: '/team/add',
    })
  }
  const teamList = ref([]);

  onMounted(() => {
    listTeam();
  });

  const onSearch = (val) => {
    listTeam(val)
  };

  /**
   * 搜索队伍
   * @param val
   * @returns {Promise<void>}
   */
  const listTeam = async (val = '') => {
    const res = await myAxios.get("/team/list/my/create", {
      params: {
        searchText: val,
        pageNum: 1,
      },
    });
    if (res?.code === 0) {
      teamList.value = res.data;
    } else {
      showFailToast('加载队伍失败，请刷新重试');
    }
  }

</script>

<style scoped>

</style>