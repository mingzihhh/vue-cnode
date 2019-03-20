<template>
    <div class="msg-list">
        <ul>
            <li v-for="(item, index) of readMessages" :key="item.id">
                <div v-if="item.type === 'reply'">
                    <router-link :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</router-link>
                    <span> 回复了你的话题 </span>
                    <router-link :to="`/topic/${item.topic.id}`">{{ item.topic.title }}</router-link>
                </div>
                <div v-else-if="item.type == 'at'">
                    <router-link :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</router-link>
                    <span> 在话题 </span>
                    <router-link :to="`/topic/${item.topic.id}`">{{ item.topic.title }}</router-link>
                    <span> 中@了你</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Msg',
    props: {
        readMessages: {
            type: Array,
            default () {
                return [];
            }
        }
    },
}
</script>

<style scoped>
ul li {
    padding: 10px;
    background-color: #fff;
    line-height: 30px;
}
ul li a {
    color: #333;
}
ul li:hover {
    background-color: #f6f6f6;
}

</style>




  
</style>
