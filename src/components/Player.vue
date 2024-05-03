<script setup>
import { Rectangle, Body, refObj, useScene, onPreUpdate } from 'phavuer'
import { watch } from 'vue'

import { EVENTS } from '../constants'

const scene = useScene()
const player = refObj()

let jumpTween

const sounds = Object.freeze({
	jump: scene.sound.add('audio_jump'),
})

const playerWatcher = watch(player, value => {
	value.body.mass = 100
	value.name = 'Player'

	playerWatcher()
})

onPreUpdate(() => {
	if (player.value.body.blocked.down) {
		jumpTween?.stop()
		player.value.rotation = 0
	}
})

function onCreate(elem) {
	scene.events.emit(EVENTS.CREATED_PLAYER, elem)

	scene.input.on(
		'pointerdown',
		() => {
			jump()
		},
		scene
	)
}

function jump() {
	if (!player.value.body.blocked.down) return

	player.value.body.setVelocityY(-300)
	sounds.jump.play()

	jumpTween = scene.tweens.add({
		targets: player.value,
		angle: { from: 0, to: 360 },
		duration: 1000,
		repeat: -1,
	})
}
</script>

<template>
	<Rectangle
		:width="32"
		:height="32"
		:fillColor="0x00ff00"
		ref="player"
		@create="onCreate"
	>
		<Body :collideWorldBounds="true" :dragY="10" />
	</Rectangle>
</template>
