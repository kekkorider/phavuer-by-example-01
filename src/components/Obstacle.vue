<script setup>
import { Rectangle, Body, refObj, useScene } from 'phavuer'
import { watch } from 'vue'

import { EVENTS } from '../constants'

defineEmits(['destroy'])

const scene = useScene()
const obstacleRef = refObj()

const obstacleWatcher = watch(obstacleRef, value => {
	value.body.setAllowGravity(false)
	obstacleWatcher()
})

function onCreate(elem) {
	scene.events.emit(EVENTS.CREATED_OBSTACLE, elem)
}
</script>

<template>
	<Rectangle
		:fillColor="0xff0000"
		:width="32"
		:height="32"
		ref="obstacleRef"
		@create="onCreate"
	>
		<Body />
	</Rectangle>
</template>
