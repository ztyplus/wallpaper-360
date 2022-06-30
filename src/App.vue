<template>
    <router-view :key="$route.query"></router-view>
    <div class="side">
        <SideMenu></SideMenu>
    </div>
</template>

<script>
import SideMenu from '@/components/SideMenu'
export default {
    components: { SideMenu}
}
</script>


<style>
body {
  background-color: #242629;
  padding: 0!important;
}
.transform {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
}
* {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}
/* 滚动条样式 */
::-webkit-scrollbar {
    width: 2px;
    height: 4px;
    background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #29f;
}
</style>
