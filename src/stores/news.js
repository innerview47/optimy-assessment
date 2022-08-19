import { defineStore } from 'pinia';
import axios from 'axios';

const baseURL = 'http://localhost:8000/news';
export const useNewsStore = defineStore({
    id: 'news',
    state: () => ({
        news: {
            data: [],
            isFetching: false,
            selected: {}
        }
    }),
    actions: {

        /**
         * Updates news store
         *
         * @param {Array} data news data
         * */
        updateStore (data) {
            this.news = {
                ...this.news,
                data: data
            }
        },

        /**
         * Sets selected news
         *
         * @param {Number} id news id
         * */
        setSelected (id) {
            this.news = {
                ...this.news,
                selected: this.news?.data.filter((item) => item.id === id)[0]
            }
        },

        /**
         * Clears selected news
         * */
        clearSelected () {
            this.news = {
                ...this.news,
                selected: {}
            }
        },

        /**
         * Gets news data
         * */
        getNews () {
            axios.get(baseURL).then(res => {
                if (res.data) {
                    this.updateStore(res.data);
                    console.log('API call >>> getNews was successful!');
                }
            }).catch (e => {
                console.error(e);
            });

        },

        /**
         * Adds new item in news data
         *
         * @param {Object} data data to be added
         * */
        addNews (data) {
            if (data) {
                return new Promise((resolve) => {
                    axios.post(baseURL, data).then(res => {
                        if (res.data) {
                            this.updateStore(res.data);
                            resolve(res);
                            console.log('API call >>> addNews was successful!');
                        }
                    }).catch(e => {
                        console.error(`API call >>> addNews failed: ${e}`);
                    });
                })
            }
        },

        /**
         * Updates selected news item
         *
         * @param {Number} id news id
         * @param {Object} data data to be updated
         * */
        updateNews (id, data) {
            if (id && data) {
                return new Promise((resolve) => {
                    axios.put(`${baseURL}/${id}`, data).then(res => {
                        if (res.data) {
                            this.news = this.news?.data.map(item => {
                                if (item.id === id) {
                                    for (const [key, value] of Object.entries(res.data)) {
                                        item[key] = value;
                                    }
                                }
                                return item;
                            });
                            resolve(res);
                            console.log('API call >>> updateNews was successful!');
                        }
                    }).catch(e => {
                        console.error(`API call >>> updateNews failed: ${e}`);
                    });
                });
            }
        },

        /**
         * Deletes selected news item
         *
         * @param {Number} id news id
         * */
        deleteNews (id) {
            if (id) {
                let decision = confirm('Are you sure you want to delete this data?');
                if (decision) {
                    return new Promise((resolve) => {
                        axios.delete(`${baseURL}/${id}`).then(res => {
                            console.log(res)
                            if (res.data) {
                                this.updateStore(this.news?.data.filter(item => item.id !== id));
                                resolve(res);
                                console.log('API call >>> deleteNews was successful!');
                            }
                        }).catch(e => {
                            console.error(`API call >>> deleteNews failed: ${e}`);
                        });
                    });
                }
            }
        }
    }
})