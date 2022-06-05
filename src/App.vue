<style lang="scss">
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";

$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
@import "~animate.css/animate.min.css";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";
@import "./styles/main";
@import "./styles/extra";
</style>

<template>
  <div id="wrap">
    <TheHeader/>

    <!--根据路由不断变化的页面开始-->
    <div id="main-container" class="container main-container">
      <router-view/>
    </div>
    <!--根据路由不断变化的页面结束-->

    <TheFooter/>
  </div>
</template>
<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from "@/components/layouts/TheFooter";

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
}
</script>


