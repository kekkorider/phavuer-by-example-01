<script setup>
import { Game } from 'phavuer'

import PreloadScene from './scenes/Preload.vue'
import MainScene from './scenes/Main.vue'
import GameOverScene from './scenes/GameOver.vue'

const config = {
	width: 600,
	height: 300,
	backgroundColor: 0x87ceeb,
	gameTitle: 'Phavuer Starter',
	gameVersion: '0.1.0',
	transparent: false,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 800 },
			debug: true,
		},
	},
}
</script>

<template>
	<Game :config="config">
		<PreloadScene :autoStart="true" />
		<MainScene :autoStart="false" />
		<GameOverScene :autoStart="false" />
	</Game>
</template>
