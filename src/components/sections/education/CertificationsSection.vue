<template>
    <card-section v-show="certifications.length" title="Certifications">
        <grid-layout>
            <insight-card v-for="(certification, index) in certifications" v-bind="certification" :key="index"/>
        </grid-layout>
    </card-section>
</template>

<script setup>
import CardSection from "@/components/core/CardSection.vue";
import InsightCard from "@/components/core/InsightCard.vue";
import GridLayout from "@/components/core/GridLayout.vue";

const certifications = []

</script>