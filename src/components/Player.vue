<script setup>
import { Rectangle, Body, refObj, useScene } from 'phavuer'
import { shallowRef, watch } from 'vue'

const scene = useScene()
const player = refObj()

const invisible = shallowRef(false)
const jumping = shallowRef(false)
const health = shallowRef(10)

const playerWatcher = watch(player, value => {
	value.body.mass = 10

	playerWatcher()
})
</script>

<template>
	<Rectangle :width="32" :height="32" :fillColor="0x00ff00" ref="player">
		<Body :collideWorldBounds="true" :dragY="10" />
	</Rectangle>
</template>
