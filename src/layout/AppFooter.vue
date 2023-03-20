<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig, contextPath } = useLayout();

const logoUrl = computed(() => {
    return `${contextPath}layout/images/sword.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="40" class="mr-2" />
        by
        <span class="font-medium ml-2">Knameless</span>
    </div>
</template>
<style lang="scss" scoped></style>
