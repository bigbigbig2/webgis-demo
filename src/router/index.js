import { createRouter,createWebHashHistory} from 'vue-router';
import Home from './../components/Home.vue'
import Night from './../view/night.vue'
import three from './../view/3D-night.vue'
import queryWFS from './../view/queryWFS.vue'
import addWFS from '../view/addWFS.vue';
import deleteWFS from './../view/deleteWFS.vue';
import operateWFS from './../view/operateWFS.vue'


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
                component:Night
            },
            {
                name:'three',
                path:'/three',
                meta:{
                    title:'3D Earth at Night'
                },
                component:three
            },
            {
                name:'queryWFS',
                path:'/queryWFS',
                meta:{
                    title:'通过WFS查询要素'
                },
                component:queryWFS
            },
            {
                name:'addWFS',
                path:'/addWFS',
                meta:{
                    title:'通过WFS添加要素'
                },
                component:addWFS
            },
            {
                name:'deleteWFS',
                path:'/deleteWFS',
                meta:{
                    title:'通过WFS删除要素'
                },
                component:deleteWFS
            },
            {
                name:'operateWFS',
                path:'/operateWFS',
                meta:{
                    title:'通过WFS修改要素'
                },
                component:operateWFS
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;