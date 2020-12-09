<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
// 引入request 方法
import { getAction, postAction } from '@/api/manage'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    fn(){
      // 调用请求方法
      getAction(),
      postAction()
    }
  }
  
}
</script>
