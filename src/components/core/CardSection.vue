<template>
    <section class="card-section">
        <h4 class="card-section_title">
            {{ title }}
        </h4>
        <div class="card-section_wrapper">
            <slot></slot>
        </div>
    </section>
</template>

<script setup>
    const {title} = defineProps(["title"])
</script>

<style>
.card-section {
    border: 1px solid gray;
    border-radius: 10px;
}

.card-section_title {
	color: white;
	font-weight: bold;
	background-color: var(--main-color);
	padding: 30px;
	border-radius: 10px 10px 0px 0px;
	font-size: 1.5rem;
}
.card-section_wrapper {
    padding: 30px;
}
</style>