import { createRouter,createWebHashHistory} from 'vue-router';
import Home from './../components/Home.vue'
import Night from './../view/night.vue'

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
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;