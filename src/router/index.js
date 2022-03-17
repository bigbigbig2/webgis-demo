import { createRouter,createWebHashHistory} from 'vue-router';
import Home from './../components/Home.vue'
import Night from './../view/night.vue'
import three from './../view/3D-night.vue'

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
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;