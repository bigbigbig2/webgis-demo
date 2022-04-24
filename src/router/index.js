import { createRouter,createWebHashHistory} from 'vue-router';
import Home from './../components/Home.vue'


const routes = [
    {
        name:'home',
        path:'/',
        meta:{
            title:"首页"
        },
        component:Home,
        redirect:'/night',//重定向到某个子路由
        children:[
            {
                name:'night',
                path:'/night',
                meta:{
                    title:'Earth at Night'
                },
                component:()=>import('@/view/night.vue'),
            },
            {
                name:'three',
                path:'/three',
                meta:{
                    title:'3D Earth at Night'
                },
                component:()=>import('@/view/3D-night.vue')
            },
            {
                name:'queryWFS',
                path:'/queryWFS',
                meta:{
                    title:'通过WFS查询要素'
                },
                component:()=>import('@/view/queryWFS.vue')
            },
            {
                name:'addWFS',
                path:'/addWFS',
                meta:{
                    title:'通过WFS添加要素'
                },
                component:()=>import('@/view/addWFS.vue')
            },
            {
                name:'deleteWFS',
                path:'/deleteWFS',
                meta:{
                    title:'通过WFS删除要素'
                },
                component:()=>import('@/view/deleteWFS.vue')
            },
            {
                name:'operateWFS',
                path:'/operateWFS',
                meta:{
                    title:'通过WFS修改要素'
                },
                component:()=>import('@/view/operateWFS.vue')
            },
            {
                name:'rain',
                path:'/rain',
                meta:{
                    title:'雨水分布图'
                },
                component:()=>import('@/view/rain.vue')
            },
            {
                name:'log',
                path:'/log',
                meta:{
                    title:'更新日志'
                },
                component:()=>import('@/view/log.vue')
            },
            {
                name:'arc',
                path:'/arc',
                meta:{
                    title:'网站架构'
                },
                component:()=>import('@/view/arc.vue')
            },
            
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;