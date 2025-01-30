<template>
    <div class="insight-wrapper">
        <img class="insight_picture" :src="picture" :alt="title" srcset="">
        <div class="insight_content">
            <h5>{{ title }}</h5>
            <i> {{ shortDescription }}</i>
            <div v-if="badges.length">
                <span v-for="(badge, count) in badges" :key="count" class="insight_badge"> {{ badge }}</span>
            </div>
            <div>
                <i v-if="dates?.start">{{ dates.start }}</i>
                - 
                <i v-if="dates?.end">{{ dates.end }}</i>
            </div>
            <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">See more</a>
        </div>
    </div>
</template>

<script setup>

import avatarLogo from "@/assets/img/avatar.png";

const {title, badges, shortDescription, link, picture} = defineProps({
    title: String,
    shortDescription: String,
    badges: {
        type: Array,
        default: () => ([]),
    },
    link: String,
    dates: {
        type: Object,
        default: () => ({}),
    },
    picture: {
        type: String,
        default: avatarLogo,
    }
})
</script>

<style scoped>

.insight-wrapper {
    width: 150px;
    display: flex;
    flex-direction: column;
}

.insight_picture {
	width: 100px;
	height: 100px;
	margin: 0px auto;
	border-radius: 100%;
	border: 1px solid black;
}

.insight_content {
    text-align: center;
}

.insight_badge {
    padding: 5px;
    border-radius: 10px;
    background: var(--secondary-color, gray);
    color: white;
    margin: 0 2px;
}
</style>