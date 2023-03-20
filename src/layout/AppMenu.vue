<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Inicio',
        items: [
            {
                label: 'Biblioteca',
                icon: 'pi pi-fw pi-home',
                to: '/biblioteca'
            }
        ]
    },
    {
        label: 'Configuraciones',
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                to: '/usuarios/all'
            },
            {
                label: 'Categorias',
                icon: 'pi pi-fw pi-bookmark-fill',
                to: '/categorias'
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-info-circle',
                to: '/roles'
            },
            {
                label: 'Libros',
                icon: 'pi pi-fw pi-book',
                to: '/libros'
            },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
