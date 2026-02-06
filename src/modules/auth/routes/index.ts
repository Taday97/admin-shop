import { type RouteRecordRaw } from 'vue-router';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';

const routersAdmin: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'a',
    component: LoginPage,
  },
];

export default routersAdmin;
