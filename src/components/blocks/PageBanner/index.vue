<script setup>
import { ImageLoader } from '@/components';

const props = defineProps({
  imageUrl: '',
  title: '',
  subtitle: ''
})
</script>
<template>
<div class="page-banner w-100">
    <div class="page-banner__img">
    <ImageLoader
        :imageUrl="imageUrl"
        :lazyLoad="true"
        containerClass="container-class"
    />
    </div>
    <div class="page-banner__texts-container d-flex justify-content-center align-items-center flex-column">
    <h1 class="page-banner__texts-title">
        {{title}}
    </h1>
    <p class="page-banner__texts-subtitle">
        {{subtitle}}
    </p>
    </div>
</div>
</template>
<style scoped>
@import './style.css';
</style>