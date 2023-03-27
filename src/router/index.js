import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: () => import('@/views/welcome.vue')
                },
                {
                    path: '/biblioteca',
                    name: 'biblioteca',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/perfil',
                    name: 'perfil',
                    component: () => import('@/views/perfil.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/pages/auth/register.vue')
        },
        {
            path: '/config',
            component: AppLayout,
            children: [
                {
                    path: '/usuarios/all',
                    name: 'usuarios-all',
                    component: () => import('@/views/usuariosList.vue')
                },
                {
                    path: '/categorias',
                    name: 'categorias',
                    component: () => import('@/views/categorias.vue')
                },
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => import('@/views/roles.vue')
                },
                {
                    path: '/libros',
                    name: 'libros',
                    component: () => import('@/views/libros.vue')
                }
            ]
        }
    ]
});

export default router;
