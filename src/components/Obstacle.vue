<script setup>
import { Image, Body, refObj, useScene } from 'phavuer'
import { watch, ref } from 'vue'

import { EVENTS } from '../constants'

defineEmits(['destroy'])

//
// Refs
//
const scene = useScene()
const obstacleRef = refObj()
const bodyEnabled = ref(true)

//
// Watchers
//
const obstacleWatcher = watch(obstacleRef, value => {
	value.body.setAllowGravity(false)
	value.name = 'Obstacle'
	obstacleWatcher()
})

//
// Methods
//
function onCreate(elem) {
	scene.events.emit(EVENTS.CREATED_OBSTACLE, elem)
}
</script>

<template>
	<Image
		texture="pino"
		:display-width="32"
		:display-height="64"
		ref="obstacleRef"
		@create="onCreate"
	>
		<Body :enable="bodyEnabled" />
	</Image>
</template>
