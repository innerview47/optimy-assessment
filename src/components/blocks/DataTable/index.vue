<script setup>
import router from '@/router';
import { useNewsStore } from '@/stores/news';
import { dateTableFormat } from '@/helpers/date';

const storeNews = useNewsStore();
const props = defineProps({
    data: Array
});

const handleEditClick = (id) => {
    storeNews.setSelected(id);
    router.push({
        name: 'update',
        params: {
            id: id
        }
    });
}

</script>
<template>

<table class="table">
    <thead class="table-secondary">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col" class="text-end">Action</th>
        </tr>
    </thead>
    <tbody>
        <tr
            v-if="data && data.length"
            v-for="item in data"
            :key="item.id"
        >
            <th scope="row">{{item.id}}</th>
            <td>{{item.title}}</td>
            <td>{{item.content.substr(0, 125)}}...</td>
            <td>{{dateTableFormat(item.date)}}</td>
            <td align="right">
                <button
                    class="btn btn-primary mx-2"
                    @click="handleEditClick(item.id)"
                >Edit</button>
                <button
                    class="btn btn-danger"
                    @click="storeNews.deleteNews(item.id)"
                >Delete</button>
            </td>
        </tr>
        <tr v-else>
            <h4>No data.</h4>
        </tr>
    </tbody>
</table>
</template>
<style scoped>
@import './style.css';
</style>