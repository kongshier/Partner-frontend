<!--
User:Shier
CreateTime:11:23
搜索界面
-->
<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {showToast} from 'vant/lib/vant.es';
  import {useRouter} from "vue-router"

  const router = useRouter()

  const searchText = ref('');

  //已选中的标签
  const activeIds = ref([]);
  const activeIndex = ref(0);
  const originTagList = [
    {
      text: '方向',
      children: [
        {text: 'Java', id: 'Java'},
        {text: 'Python', id: 'Python'},
        {text: '前端', id: '前端'},
        {text: '全栈', id: '全栈'},
        {text: 'Go', id: 'Go'},
        {text: 'C++', id: 'C++'},
        {text: '嵌入式', id: '嵌入式'},
        {text: '游戏开发', id: '游戏开发'},
      ],
    },
    {
      text: '性别',
      children: [
        {text: '男', id: '男'},
        {text: '女', id: '女'},
      ],
    },
    {
      text: '段位',
      children: [
        {text: '初级', id: '初级'},
        {text: '中级', id: '中级'},
        {text: '高级', id: '高级'},
        {text: '王者', id: '王者'},
      ],
    },
    {
      text: '年级',
      children: [
        {text: '小学', id: '小学'},
        {text: '初中', id: '初中'},
        {text: '高中', id: '高中'},
        {text: '大专', id: '大专'},
        {text: '大一', id: '大一'},
        {text: '大二', id: '大二'},
        {text: '大三', id: '大三'},
        {text: '大四', id: '大四'},
      ],
    }
  ];

  // 标签列表
  let tagList = ref(originTagList);

  /**
   *  搜索过滤
   * @param val
   */
  const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
      const tempChildren = [...parentTag.children];
      const tempParentTag = {...parentTag};
      tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
      return tempParentTag;
    })
  };

  // 取消搜索
  const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
  };

  //移除标签
  const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
      return item !== tag;
    })
  }

  // 搜索结果按钮跳转
  const doSearchResult = () => {
    router.push({
      path: '/user/list', // 指定路由
      query: {
        tags: activeIds.value
      }
    })
  }

</script>

<style scoped>

</style>