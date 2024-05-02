<script setup>
import { Sprite, useScene, refObj, Body } from 'phavuer'
import { watch } from 'vue'

const scene = useScene()
const coinRef = refObj()

!!!scene.anims.anims.entries.coinSpin &&
	scene.anims.create({
		key: 'coinSpin',
		frames: scene.anims.generateFrameNames('coin', {
			start: 0,
			end: 8,
		}),
		frameRate: 8,
		repeat: -1,
	})

const coinWatcher = watch(coinRef, value => {
	value.body.setAllowGravity(false)
	coinWatcher()
})
</script>

<template>
	<Sprite :texture="'coin'" play="coinSpin" ref="coinRef">
		<Body />
	</Sprite>
</template>
