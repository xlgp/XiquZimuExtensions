import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chromeExtension } from "vite-plugin-chrome-extension";
import { resolve } from "path";
import Components from 'unplugin-vue-components/vite'
import {
    ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    build: {
        rollupOptions: {
            input: "src/manifest.json"
        }
    },
    plugins: [
        vue(),
        chromeExtension(),
        Components({
            dts: true,
            dirs: ['src/components', 'src/views'],
            resolvers: [
                ElementPlusResolver()]
        }),
    ],
})
