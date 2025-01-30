<template>
    <TlWrap v-for="experience in experiences" :title="experience.title" :timeline-items="experience.items"/>
</template>

<script setup>
    import TlWrap from "@/components/core/TlWrap.vue";
    const experiences = [
        {
            title: "Playvox",
            items: [
                {
                  date: '2024-01-15',
                  title: 'Project Kickoff',
                  description: 'Initial meeting with stakeholders to define project scope.'
                },
                {
                  date: '2024-02-01',
                  title: 'Design Phase',
                  description: 'Completed initial wireframes and design mockups.'
                },
                {
                  date: '2024-03-10',
                  title: 'Development',
                  description: 'Started frontend implementation of core features.'
                }
            ]
        },
        {
            title: "MySEO Company",
            items: [
                {
                  date: '2024-01-15',
                  title: 'Project Kickoff',
                  description: 'Initial meeting with stakeholders to define project scope.'
                },
            ]
        },
        {
            title: "J & V company",
            items: [
                {
                  date: '2024-01-15',
                  title: 'Project Kickoff',
                  description: 'Initial meeting with stakeholders to define project scope.'
                }
            ]
        }
    ]
</script>