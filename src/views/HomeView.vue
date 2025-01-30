<template>
  <LandingView />
  <AboutSection />
  <EducationView />
  <VolunteerView />
  <JobExperience />
</template>

<script setup lang="ts">
import LandingView from "../components/sections/LandingView.vue"
import AboutSection from "../components/sections/About.vue";
import EducationView from "../components/sections/education/MainView.vue";
import VolunteerView from "../components/sections/Volunteer.vue";
import JobExperience from "../components/sections/experience/JobExperience.vue";
</script>
