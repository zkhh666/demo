import router from './router'

// 路由守卫   验证token存在否
router.beforeEach((to, from, next) => {
    next()
    // let lastname = localStorage.getItem("token");
    // if (lastname) {
    //   next()
    // } else {
    //   if (to.path === '/user/login') {
    //     next()
    //   } else {
    //     next({
    //       path: '/user/login',
    //     })
    //   }
  
    // }
  
  })
  