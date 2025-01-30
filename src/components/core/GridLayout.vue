<template>
    <div class="grid-layout">
        <slot />
    </div>
</template>

<style>
.grid-layout {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 10px;
	grid-auto-rows: minmax(100px, auto);
}
</style>