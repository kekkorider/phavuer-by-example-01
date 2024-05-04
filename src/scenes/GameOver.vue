<script setup>
import { Scene, useGame } from 'phavuer'

import { SCENES } from '../constants'

const game = useGame()

//
// Methods
//
function onCreate(scene) {
	scene.add
		.bitmapText(
			game.scale.width * 0.5,
			50,
			'bmfont_arcade',
			scene.registry.get('score'),
			25
		)
		.setOrigin(0.5)

	scene.add
		.bitmapText(
			game.scale.width * 0.5,
			game.scale.height * 0.5,
			'bmfont_arcade',
			'GAME OVER',
			45
		)
		.setOrigin(0.5)

	scene.add
		.bitmapText(
			game.scale.width * 0.5,
			250,
			'bmfont_arcade',
			'Press SPACE or Click to restart!',
			15
		)
		.setOrigin(0.5)

	scene.input.keyboard.once('keydown-SPACE', restartGame, scene)
	scene.input.once('pointerdown', restartGame, scene)
}

function restartGame() {
	game.scene.start(SCENES.MAIN)
	game.scene.stop(SCENES.GAME_OVER)
}
</script>

<template>
	<Scene :name="SCENES.GAME_OVER" @create="onCreate"></Scene>
</template>
