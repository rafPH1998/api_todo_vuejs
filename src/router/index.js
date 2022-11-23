import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TodosView from '@/views/Todos/TodosView.vue'
import TodoFormAddView from '@/views/Todos/TodoFormAddView.vue'
import TodoFormEditView from '@/views/Todos/TodoFormEditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todos',
    name: 'todos.index',
    component: TodosView
  }, 
  {
    path: '/todos/add',
    name: 'todos.add',
    component: TodoFormAddView
  }, 
  {
    path: '/todos/:id/edit',
    name: 'todos.edit',
    component: TodoFormEditView,
    props: true
  }, 


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
