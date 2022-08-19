<script setup>
import { ImageLoader } from '@/components';
import { dateNewsFormat } from '@/helpers/date';

const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  date: String,
  type: String
});

</script>
<template>
    <div class="card w-100 d-flex flex-column p-3">
        <div class="card-img">
            <ImageLoader
            :imageUrl="imageUrl"
            :lazyLoad="true"
            />
        </div>
        <div class="card-info__container d-flex flex-md-grow-1 justify-content-between flex-column py-2">
            <p class="card-info__title">
                {{title}}
            </p>
            <p class="card-info__description">
                {{description}}
            </p>
            <div class="card-info__date">
                {{dateNewsFormat(date)}}
            </div>
        </div>
    </div>
</template>
<style scoped>
@import './style.css';
</style>