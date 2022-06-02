<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}images/202101/26/48878/4NbpRGTbE3.png`,
        title: "Learnku Vue.js",
      },
    };
  },
  beforeCreate() {
    this.uploadsUrl = "https://cdn.learnku.com/uploads/";
  },
};
</script>

<style scoped>
.title {
  display: none;
}
</style>
