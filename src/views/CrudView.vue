<script setup>
import { onBeforeMount } from 'vue';
import { RouterLink } from "vue-router";
import { useNewsStore } from '@/stores/news';
import { DataTable } from '@/components';

const storeNews = useNewsStore();
onBeforeMount(() => {
    storeNews.getNews();
})
</script>
<template>
<div class="container">
    <div class="d-flex justify-content-between mb-3 pt-3">
        <h3>News</h3>
        <RouterLink :to="{ name: 'add' }" class="btn btn-success">Add</RouterLink>
    </div>
    <DataTable :data="storeNews.news?.data" />
</div>
</template>
<style scoped></style>