<script setup>
import { Scene } from 'phavuer'

import { SCENES } from '../constants'
import assets from '../assets.json'

function onPreload(scene) {
	scene.registry.set('score', 0)

	Object.keys(assets).forEach(methodName => {
		assets[methodName].forEach(args => {
			switch (methodName) {
				case 'bitmapFont':
					scene.load.bitmapFont(args[0], ...args[1])
					break
				default:
					scene.load[methodName](...args)
					break
			}
		})
	})
}

function onCreate(scene) {
	scene.scene.start(SCENES.MAIN)
	scene.scene.stop(SCENES.PRELOAD)
}
</script>

<template>
	<Scene :name="SCENES.PRELOAD" @preload="onPreload" @create="onCreate" />
</template>
