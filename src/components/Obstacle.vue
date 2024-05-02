<script setup>
import { Rectangle, Body, refObj } from 'phavuer'
import { watch } from 'vue'

defineEmits(['destroy'])

const obstacleRef = refObj()

const obstacleWatcher = watch(obstacleRef, value => {
	value.body.setAllowGravity(false)
	obstacleWatcher()
})
</script>

<template>
	<Rectangle :fillColor="0xff0000" :width="32" :height="32" ref="obstacleRef">
		<Body />
	</Rectangle>
</template>
