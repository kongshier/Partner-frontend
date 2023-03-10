<!--
User:Shier
CreateTime:14:47
队伍展示页面
-->
<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开队伍" name="public"/>
      <van-tab title="加密队伍" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 10px"/>
    <team-card-list :teamList="teamList"/>
    <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"></van-button>
    <van-empty v-if="teamList?.length<1" description="无相关队伍"/>
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
  // 队伍列表
  const teamList = ref([]);
  // 默认展示公开队伍
  const active = ref('public')


  /**
   * 切换查询队伍状态
   */
  const onTabChange = (name) => {
    // 公开
    if (name === 'public') {
      listTeam(searchText.value, 0);
    } else {
      // 加密
      listTeam(searchText.value, 2);
    }
  }

  // 跳转创建队伍页面
  const toAddTeam = () => {
    router.push({
      path: '/team/add',
    })
  }

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
  const listTeam = async (val = '', status = 0) => {
    const res = await myAxios.get("/team/list", {
      params: {
        searchText: val,
        pageNum: 1,
        status
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