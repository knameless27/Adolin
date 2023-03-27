<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import axios from '@/service/books.js'

onMounted(()=> {
    const xd = document.cookie
    console.log(xd);
    // axios.getBooks().then((res)=> {
    //     console.log(res);
    // })
})
</script>

<template>
    <div class="card">
    </div>
</template>
