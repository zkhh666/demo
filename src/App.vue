<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data(){
      return{
          isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        })
      }
    }
}
</script>
<style lang="less">
/* 声明全局样式和项目的初始化样式 */
body, h1, h2, h3, h4, p, table, tr, td, ul, li, a, form, input, select, option, textarea {
    margin: 0;
    padding: 0;
    font-size: 15px;
}

a {
    text-decoration: none;
    color: #333;
}

ul {
    list-style: none;
}

table {
    border-collapse: collapse; /* 合并边框 */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
