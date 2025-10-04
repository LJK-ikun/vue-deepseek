//导出routes
const routes = [
    {
        path: '/',
        name: 'deepseek',
        component: () => import('../views/deepseek/Index.vue'),
    }
]

export default routes
