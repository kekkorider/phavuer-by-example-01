import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import phaserAssetsRollupPlugin from 'phaser-assets-loader/plugins/rollupPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    phaserAssetsRollupPlugin({
      patterns: [
        { type: 'image', dir: '/images', rule: /^\w+\.(png|svg)$/ },
        { type: 'audio', dir: '/audio', rule: /^\w+\.(mp3)$/, prefix: 'audio_'},
        { type: 'bitmapFont', dir: '/bitmap-fonts', rule: /^\w+\.(png|xml)$/, prefix: 'bmfont_'},
      ],
      output: './src/assets.json'
    })
  ],
})
