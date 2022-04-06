<script >
import BreadCrumb from "./BreadCrumb.vue";
import { Bell, Fold, Expand,MoonNight,LocationInformation,User} from "@element-plus/icons-vue";

export default {
  name: "home",
  components: {Bell, Fold, BreadCrumb, Expand ,MoonNight,LocationInformation,User},
  data() {
    return {
      isCollapse: true,
      noticeCount: 0,
      activeMenu: location.hash.slice(1), //获取当前页面url地址来渲染到到当前点击的menu
    };
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
  },
  mounted() {

  },
};
</script>

<template>
  <div class="basic-layout">
    <!-- 左边导航菜单 -->
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="menu-fold" @click="toggle">
          <el-icon>
            <expand v-if="isCollapse" style="cursor: pointer;font-size:25px"  />
            <fold v-else style="cursor: pointer;font-size:25px" />
          </el-icon>
          <span v-if="!isCollapse" id="text">Explore the earth</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        background-color="#2A2B2E"
        text-color="#fffff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><moon-night  style="font-size:25px" /></el-icon>
            <span>地球村的夜晚</span>
          </template>
          <el-menu-item index="night" >2012与2016</el-menu-item>
          <el-menu-item index="three">3D-2016</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location-information style="font-size:25px" /></el-icon>
            <span>dijkstra</span>
          </template>
          <el-menu-item index="dijkstra" >深圳市区最短路径导航</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><user style="font-size:25px"/></el-icon>
            <span>关于</span>
          </template>
          <el-menu-item index="1-2">探索中</el-menu-item>
          <el-menu-item index="1-3">网站架构</el-menu-item>
          <el-menu-item index="1-4"></el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右边内容块 -->
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200-px;
    height: 100vh;
    background-color: #2A2B2E;
    color: #fff;
    overflow-y: auto; //设置滚动条
    transition:width 0.5s; //设置左侧导航栏向左收起时的动画
    .menu-fold{
      margin-top: 15px;
      margin-right: 12.5px;
      margin-left: 18px;
      // padding: 25px;
      
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 60px;
      overflow: hidden;
      transition:width 0.5s;
    }
    // 展开
    &.unfold {
      width: 200px;
      overflow: hidden;
      transition:width 0.5s;
      #text{
        position: absolute;
        // top: 50%;
        top:18px;
        right:20px;
        // transform: translateY(-50%);
      }

    }
  }
  .content-right {
    margin-left: 200px; //左侧固定，右侧自适应
    // 合并
    &.fold {
      margin-left: 60px;
      transition: 0.5s;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
      transition: 0.5s;
    }
    .wrapper {
      background: #eef0f3;
      height: 100%;
    }
  }
}
</style>
