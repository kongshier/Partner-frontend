/**
 * Author:Shier
 * createTime:10:57
 * 路由组件
 */
import Index from "../pages/Index.vue";
import UserPage from "../pages/UserPage.vue"
import UserEditPage from "../pages/UserEditPage.vue"
import UserLoginPage from "../pages/UserLoginPage.vue"
import UserRegisterPage from "../pages/UserRegisterPage.vue"
import UserUpdatePage from "../pages/UserUpdatePage.vue"
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue"
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue"
import UserTagsEditPage from "../pages/UserTagsEditPage.vue"
import SearchPage from "../pages/SearchPage.vue"
import SearchResultPage from "../pages/SearchResultPage.vue"
import TeamPage from "../pages/TeamPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue"
import TeamDetailPage from "../pages/TeamDetailPage.vue"
import TeamUpdatePage from "../pages/TeamUpdatePage.vue"

// 定义路由,每个路由都需要映射到一个组件。
const routes = [
  {path: '/', component: Index},
  {path: '/search', title: '寻找伙伴', component: SearchPage},
  {path: '/user', title: '用户主页', component: UserPage},
  {path: '/user/edit', title: '修改我的信息', component: UserEditPage},
  {path: '/user/list', title: '用户列表', component: SearchResultPage},
  {path: '/user/login', title: '登录', component: UserLoginPage},
  {path: '/user/register', title: '注册', component: UserRegisterPage},
  {path: '/user/update', title: '当前我的信息', component: UserUpdatePage},
  {path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
  {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
  {path: '/user/editTags', title: '修改我的标签', component: UserTagsEditPage},
  {path: '/team', title: '寻找队伍', component: TeamPage},
  {path: '/team/detail', title: '队伍详情', component: TeamDetailPage},
  {path: '/team/add', title: '创建队伍', component: TeamAddPage},
  {path: '/team/update', title: '更新队伍信息', component: TeamUpdatePage},
]

export default routes