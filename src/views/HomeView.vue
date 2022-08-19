<script setup>
import { onMounted, reactive, ref, nextTick } from 'vue';
import { CardsList, PageBanner } from '@/components';
import { useNewsStore } from '@/stores/news';

const storeNews = useNewsStore();

let isMobile = ref(false);
let doCheck;
const state = reactive({
    news: [],
    bannerImage: {
        desktop: 'https://via.placeholder.com/1920x650',
        mobile: 'https://via.placeholder.com/600x600'
    },
    texts: {
        title: "Hello, Optimy!",
        subtitle: "Looking forward to working with you."
    }
});

/**
 * sets isMobile state if small screen
 * */
const checkIfMobile = () => {
    // wait for user to finish resizing before executing
    clearTimeout(doCheck);
    doCheck = setTimeout(() => {
        isMobile.value = window.innerWidth < 768;
    }, 80);
};
onMounted(() => {
    storeNews.getNews();
    checkIfMobile();
    nextTick(() => {
        window.addEventListener('resize', checkIfMobile)
    });
})
</script>
<template>
<div>
    <PageBanner
      :imageUrl="isMobile ? state.bannerImage.mobile : state.bannerImage.desktop"
      :title="state.texts.title"
      :subtitle="state.texts.subtitle"
    />
    <div class="container py-5">
        <CardsList :cardData="storeNews.news?.data" />
    </div>
</div>
</template>
<style scoped></style>