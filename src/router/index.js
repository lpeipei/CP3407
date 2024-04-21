import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import user from '../views/user.vue'
import timetable from '../views/timetable.vue'
import schedule from '../views/schedule.vue'
import addPlan from '../views/addPlan.vue'
import focusTime from '../views/focusTime.vue'
import dailyRecord from '../views/dailyRecord.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      query: {
        showBar: false,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: timetable
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: schedule
    },
    {
      path: '/addPlan',
      name: 'addPlan',
      component: addPlan
    },
    {
      path: '/focusTime',
      name: 'focusTime',
      component: focusTime
    },
    {
      path: '/dailyRecord',
      name: 'dailyRecord',
      component: dailyRecord
    }
  ]
})

export default router
