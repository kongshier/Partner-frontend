<!--
User:Shier
CreateTime:19:54
队伍展示列表
-->
<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :thumb=" team.avatarUrl===null || team.avatarUrl === ''  ? teamImgs[Math.round(Math.random()*4)] : team.avatarUrl"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '队伍人数: ' + `${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if=" team.userId === currentUser?.id" size="small" plain type="primary"
                    @click="doUpdateTeam(team.id)"> 编辑队伍
        </van-button>
        <!--加入队伍才可见-->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain type="danger"
                    @click="doQuitTeam(team.id)"> 退出队伍
        </van-button>
        <van-button v-if=" team.userId === currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)"> 解散队伍
        </van-button>
        <van-button plain size="small"
                    @click="doTeamDetail(team.id)">查看队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
  import {TeamType} from "../models/team";
  import {teamStatusEnum} from "../constants/team";
  import myAxios from "../plugins/myAxios";
  import teamImgs from "../services/teamImg";
  import {showFailToast, showSuccessToast} from "vant/lib/vant.es";
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import {getCurrentUser} from "../services/user";

  interface TeamCardListProps {
    teamList: TeamType[];
  }

  const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: [] as TeamType[],
  });
  const router = useRouter();
  const showPasswordDialog = ref(false);
  const password = ref('');
  const joinTeamId = ref(0);

  /**
   * 加入队伍
   */
  const doJoinTeam = async () => {
    if (!joinTeamId.value) {
      return;
    }
    const res = await myAxios.post('/team/join', {
      teamId: joinTeamId.value,
      password: password.value,
    });
    if (res?.code === 0) {
      showSuccessToast('加入成功');
      doJoinCancel();
    } else {
      showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
    }
  }
  /**
   * 判断是不是加密房间，是的话显示密码框
   * @param team
   */
  const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0) {
      doJoinTeam()
    } else {
      showPasswordDialog.value = true;
    }
  }
  /**
   * 清空内容
   */
  const doJoinCancel = () => {
    joinTeamId.value = 0;
    password.value = '';
  }

  /**
   * 更新队伍信息
   */
  const doUpdateTeam = (id: number) => {
    router.push({
      path: '/team/update',
      query: {
        id,
      }
    })
  }

  // 获取当前用户信息
  const currentUser = ref();
  onMounted(async () => {
    currentUser.value = await getCurrentUser();
  })
  /**
   * 退出队伍
   * @param id
   */
  const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/team/quit', {
      teamId: id
    });
    if (res?.code === 0) {
      showSuccessToast('退出成功');
    } else {
      showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
    }
  }

  /**
   * 解散队伍
   * @param id
   */
  const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/team/delete', {
      id,
    });
    if (res?.code === 0) {
      showSuccessToast('解散成功');
    } else {
      showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
    }
  }
  /**
   * 跳转至队伍详情页
   * @param id
   */
  const doTeamDetail = (id: number) => {
    router.push({
      path: '/team/detail',
      query: {
        id,
      }
    })
  }

</script>

<style scoped>
  #teamCardList :deep(.van-image__img) {
    height: 148px;
    object-fit: unset;
  }
</style>
