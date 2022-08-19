<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const imageHolder = ref(null);
defineExpose({ imageHolder });
const props = defineProps({
    imageUrl: '',
    lazyLoad: false,
    containerClass: '',
})

let isObserverSupported = false;
if (typeof window !== 'undefined') {
    isObserverSupported = Boolean('IntersectionObserver' in window);
}

/**
 * sets image's source
 *
 * @param {Object} target target element
 */
const loadImage = (target) => {
    target.src = target.getAttribute('data-src');
    target.addEventListener('load', imageLoadedSuccessfully);
    target.addEventListener('error', failedToLoadImage);
}

/**
 * sets animation when image has loaded successfully
 *
 * @param {Object} e the event
 */
const imageLoadedSuccessfully = (e) => {
    clearListeners(e);
    e.target.parentElement.classList.remove('not-loaded');
    e.target.classList.add('pop-in');
}

/**
 * logs error when image has failed to load
 *
 * @param {Object} e the event
 */
const failedToLoadImage = (e) => {
    console.error(`ImageLoader >>> failed to load: ${e}`);
}

/**
 * clears image listeners
 *
 * @param {Object} e the event
 */
function clearListeners (e) {
    e.target.removeEventListener('load', imageLoadedSuccessfully);
    e.target.removeEventListener('error', failedToLoadImage);
}

/**
 * loads images only when visible on screen.
 * reload on mobile to see behavior better :)
 *
 * @param {array} entries dom elements to observe
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.1 || entry.isIntersecting) {
            observer.unobserve(entry.target);
            loadImage(entry.target.childNodes[0])
        }
    });
})

onMounted(() => {
    if (isObserverSupported && props.lazyLoad) observer.observe(imageHolder.value)
})

onUpdated(() => {
    loadImage(imageHolder.value.childNodes[0])
})
</script>

<template>
    <div
        :class="`image-loader w-100 ${((lazyLoad || !imageUrl) ? 'not-loaded' : '')} ${containerClass}`"
        ref="imageHolder"
    >
    <img
        class="w-100 h-100"
        :src="(!lazyLoad && imageUrl) ? imageUrl : null"
        :data-src="imageUrl"
    >
    </div>
</template>

<style scoped>
@import './style.css';
</style>