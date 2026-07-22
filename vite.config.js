import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vite.dev/config/
export default defineConfig({
    // Served from the domain root by default (custom domain / S3). GitHub
    // Pages serves a project site under /<repo>/, so the deploy workflow sets
    // BASE_PATH=/about-me/ to prefix every asset and route.
    base: process.env.BASE_PATH || '/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@content': fileURLToPath(new URL('./content', import.meta.url)),
        },
    },
});
