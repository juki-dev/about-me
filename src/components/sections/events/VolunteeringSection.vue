<template>
    <card-section title="volunteering">
        <grid-layout>
            <insight-card v-for="(course, index) in courses" v-bind="course" :key="index"/>
        </grid-layout>
    </card-section>
</template>

<script setup>
import CardSection from "@/components/core/CardSection.vue";
import InsightCard from "@/components/core/InsightCard.vue";
import GridLayout from "@/components/core/GridLayout.vue";

const courses = [
    {
        title: "IEEE Student Branch",
        shortDescription: "President",
        dates: {
            start: 2015,
            end: 2017,
        },
    },
    {
        title: "Campamentos Juveniles",
        shortDescription: "Tallo",
        dates: {
            start: 2018,
            end: 2019,
        },
    }
]

</script>