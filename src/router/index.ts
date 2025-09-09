import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import MessageView from '@/views/MessageView.vue'
import EditMessage from '@/views/EditMessage.vue'
import PostMessage from '@/views/PostMessage.vue'
import UserView from '@/views/UserView.vue'
import EditUserView from '@/views/EditUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user/me',
      name: 'user',
      component: UserView
    },
    {
      path: '/user/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/user/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/user/edit',
      name: 'edit user',
      component: EditUserView
    },
    {
      path: '/message/:id',
      name: 'message',
      component: MessageView
    },
    {
      path: '/message/:id/edit',
      name: 'edit message',
      component: EditMessage
    },
    {
      path: '/message/post',
      name: 'post message',
      component: PostMessage
    },

  ],
})

export default router
