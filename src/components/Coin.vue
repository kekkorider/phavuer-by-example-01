<script setup>
import { Sprite, useScene, refObj, Body } from 'phavuer'
import { watch } from 'vue'

import { EVENTS } from '../constants'

//
// Refs
//
const scene = useScene()
const coinRef = refObj()

// Create the spin animation only if it doesn't exist yet
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

//
// Watchers
//
const coinWatcher = watch(coinRef, value => {
	value.body.setAllowGravity(false)
	coinWatcher()
})

//
// Methods
//
function onCreate(elem) {
	scene.events.emit(EVENTS.CREATED_COIN, elem)
}
</script>

<template>
	<Sprite :texture="'coin'" play="coinSpin" ref="coinRef" @create="onCreate">
		<Body />
	</Sprite>
</template>
