<template>
    <card-section title="courses">
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
        title: "Frontend",
        shortDescription: "Platzi",
        badges: ["frontend", "vue"],
        link: "https://platzi.com/p/crishenao1/curso/2819-vuejs/diploma/detalle/",
    },
    {
        title: "Frontend",
        shortDescription: "Platzi",
        badges: ["frontend", "vue"],
    },{
        title: "Frontend",
        shortDescription: "Platzi",
        badges: ["frontend", "vue"],
    },{
        title: "Frontend",
        shortDescription: "Platzi",
        badges: ["frontend", "vue"],
    },{
        title: "Frontend",
        shortDescription: "Platzi",
        badges: ["frontend", "vue"],
    }
]

</script>