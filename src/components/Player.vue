<script setup>
import { Rectangle, Body, refObj, useScene, onPreUpdate } from 'phavuer'
import { watch, ref } from 'vue'

import { EVENTS } from '../constants'

//
// Refs
//
const scene = useScene()
const player = refObj()
const bodyEnabled = ref(true)

//
// Misc
//
let jumpTween

const spaceKey = scene.input.keyboard.addKey(
	Phaser.Input.Keyboard.KeyCodes.SPACE
)

const sounds = Object.freeze({
	jump: scene.sound.add('audio_jump'),
})

//
// Watchers
//
const playerWatcher = watch(player, value => {
	value.body.mass = 10
	value.name = 'Player'

	playerWatcher()
})

//
// Game loop
//
onPreUpdate(() => {
	if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
		jump()
	} else if (player.value.body?.blocked?.down) {
		jumpTween?.stop()
		player.value.rotation = 0
	}
})

//
// Methods
//
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

	player.value.body.setVelocityY(-350)
	sounds.jump.play()

	jumpTween = scene.tweens.add({
		targets: player.value,
		angle: { from: 0, to: 360 },
		duration: 700,
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
		<Body :collideWorldBounds="true" :enable="bodyEnabled" :dragY="10" />
	</Rectangle>
</template>
