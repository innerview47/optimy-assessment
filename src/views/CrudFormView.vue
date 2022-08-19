<script setup>
import { reactive, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router'
import { FormGroup, FormInput } from '@/components';
import { useNewsStore } from '@/stores/news';
import router from '../router';

const storeNews = useNewsStore();

const route = useRoute();

const state = reactive({
    id: storeNews.news?.selected?.id || null,
    image: {
        value: storeNews.news?.selected?.image || '',
        hasErrors: false
    },
    title: {
        value: storeNews.news?.selected?.title || '',
        hasErrors: false
    },
    content: {
        value: storeNews.news?.selected?.content || '',
        hasErrors: false
    }
});


/**
 * Validates title input
 *
 * @param {String} value value of input
 * */
const onTitleChanged = (value) => {
    state.title = {
        ...state.title,
        value: value,
        hasErrors: !Boolean(value),
        message: !Boolean(value) ? 'REQUIRED' : ''
    }
}


/**
 * Validates title input
 *
 * @param {String} value value of input
 * */
const onImageChanged = (value) => {
    state.image = {
        ...state.image,
        value: value,
        hasErrors: !Boolean(value),
        message: !Boolean(value) ? 'REQUIRED' : ''
    }
}

/**
 * Validates content input
 *
 * @param {String} value value of input
 * */
const onContentChanged = (value) => {
    state.content = {
        ...state.content,
        value: value,
        hasErrors: !Boolean(value),
        message: !Boolean(value) ? 'REQUIRED' : ''
    }
}

/**
 * Clears state
 * */
const clearState = () => {
    state.id = null;
    state.title.value = '';
    state.image.value = '';
    state.content.value = '';
    storeNews.clearSelected();
}


/**
 * Save for update
 *
 * @param {Object} data data to update
 * */
const onUpdateNews = (data) => {
    storeNews.updateNews(state.id, data).then((res) => {
        if (res.data) {
            alert('Item updated successfully!');
        }
    });
}

/**
 * Save for add
 *
 * @param {Object} data data of news to be added
 * */
const onAddNews = (data) => {
    let id = storeNews?.news?.data?.at(-1)?.id + 1
    data = {
        ...data,
        id: id
    };

    storeNews.addNews(data).then((res) => {
        if (res.data) {
            alert('Item added successfully');
            clearState();
            router.push('/crud');
        }
    })
}


/**
 * Save button click handler
 * */
const handleBtnClick = () => {
    if (!state.title.value || !state.content.value) {
        onTitleChanged(state.title.value);
        onContentChanged(state.content.value);
    } else {
        let data = {
            image: state.image.value,
            title: state.title.value,
            content: state.content.value,
            date: new Date()
        };
        if (state.id) {
            onUpdateNews(data);
            return;
        }
        onAddNews(data);
    }

}

onBeforeUnmount(() => {
    clearState();
})
</script>
<template>
<div class="crud-form">
    <div class="container">
        <h3 class="text-capitalize mb-3">
            {{route.name}} News
        </h3>
        <FormGroup
            :hasErrors="state.title.hasErrors"
            :message="state.title.message"
        >
            <FormInput
                type="text"
                label="Title"
                v-model="state.title.value"
                :hasErrors="state.title.hasErrors"
                @input="(e) => { onTitleChanged(e.target.value) }"
                @onBlur="(e) => { onTitleChanged(e.target.value) }"
            />
        </FormGroup>
        <FormGroup
            class="mt-4"
            :hasErrors="state.image.hasErrors"
            :message="state.image.message"
        >
            <FormInput
                type="text"
                label="Image URL"
                v-model="state.image.value"
                :hasErrors="state.image.hasErrors"
                @input="(e) => { onImageChanged(e.target.value) }"
                @onBlur="(e) => { onImageChanged(e.target.value) }"
            />
        </FormGroup>
        <FormGroup
            class="mt-4"
            :hasErrors="state.content.hasErrors"
            :message="state.content.message"
        >
            <FormInput
                type="textarea"
                label="Content"
                v-model="state.content.value"
                :hasErrors="state.content.hasErrors"
                @input="(e) => { onContentChanged(e.target.value) }"
                @onBlur="(e) => { onContentChanged(e.target.value) }"
            />
        </FormGroup>

        <div class="mt-4">
            <button
                v-if="route.name === 'update' || route.name === 'add'"
                class="btn btn-success"
                @click="handleBtnClick"
            >Save</button>

            <RouterLink :to="{ name: 'read' }" class="btn btn-danger mx-2">Back</RouterLink>
        </div>
    </div>
</div>
</template>
<style scoped></style>