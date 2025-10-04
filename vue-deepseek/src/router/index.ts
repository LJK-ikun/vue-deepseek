// 导入router所需的方法
import { createRouter, createWebHashHistory } from 'vue-router'
//导入路由配置文件
import routes from './routes'
//创建路由实例
const router = createRouter({
    //使用history模式
  history: createWebHashHistory(),
  routes,
  //每次跳转的时候都滚动到顶部
  scrollBehavior() {
    //始终滚动到顶部
    return { top: 0}
  }
})


// 全局前置守卫（权限校验）
router.beforeEach((to: any, from: any,  next: () => void) => {
    console.log(to, from)
    next()
})

// 全局后置守卫 (页面切换完成后执行)
router.afterEach((to: any, from: any) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    } else {
        window.document.title = "基于Vue3+DeepSeek开发ai问答助手"
    }
})

export default router