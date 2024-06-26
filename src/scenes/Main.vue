<script setup>
import { Scene, useGame, refScene } from 'phavuer'
import { ref, shallowRef } from 'vue'

import { SCENES, EVENTS } from '../constants'
import Generator from '../assets/Generator'

import Player from '../components/Player.vue'
import Cloud from '../components/Cloud.vue'
import Obstacle from '../components/Obstacle.vue'
import Coin from '../components/Coin.vue'

//
// Refs
//
const game = useGame()
const sceneRef = refScene()
const score = shallowRef(0)
const scoreText = shallowRef(null)

const clouds = ref([])
const cloudTweens = ref({})

const obstacles = ref([])
const obstaclesTweens = ref({})

const coins = ref([])
const coinTweens = ref({})

//
// Misc
//
let generator,
	obstaclesGroup,
	coinsGroup,
	updateScoreEvent,
	playerObstaclesCollider,
	playerCoinsCollider

const sounds = {
	coin: null,
	theme: null,
}

//
// Methods
//
function onPreload(scene) {
	sounds.coin = scene.sound.add('audio_coin')
	sounds.theme = scene.sound.add('audio_theme', { loop: true })
	sounds.dead = scene.sound.add('audio_dead')
}

function onCreate(scene) {
	game.registry.set('score', 0)
	score.value = game.registry.get('score')

	// Create physics group
	obstaclesGroup = scene.physics.add.group()
	coinsGroup = scene.physics.add.group()

	// Timer event that updates the score every 100ms
	updateScoreEvent = scene.time.addEvent({
		delay: 100,
		callback: () => updateScore(),
		callbackScope: scene,
		loop: true,
	})

	// Play main music
	sounds.theme.play()

	// Add bitmap text for the score
	scoreText.value = scene.add.bitmapText(
		game.scale.width * 0.5,
		10,
		'bmfont_arcade',
		score.value,
		20
	)

	scoreText.value.setOrigin(0.5, 0)

	// Define the collision between the player and the obstacles/coins once it is created
	scene.events.once(EVENTS.CREATED_PLAYER, elem => {
		playerObstaclesCollider = scene.physics.add.collider(
			elem,
			obstaclesGroup,
			hitObstacle,
			() => true,
			scene,
			false
		)

		playerCoinsCollider = scene.physics.add.overlap(
			elem,
			coinsGroup,
			hitCoin,
			() => true,
			scene,
			true
		)
	})

	// Clouds generation
	scene.events.on(EVENTS.GENERATE_CLOUD, () => {
		const alpha = 1 / Phaser.Math.Between(1, 3)
		const uuid = Phaser.Math.RND.uuid()

		Object.assign(cloudTweens.value, {
			[uuid]: {
				props: {
					x: { getEnd: () => -100 },
				},
				duration: 2000 / alpha,
				onComplete: () => {
					destroyCloud(uuid)
				},
			},
		})

		clouds.value.push({
			x: 800,
			y: Phaser.Math.Between(0, 100),
			alpha,
			scale: alpha * 1.7,
			uuid,
		})
	})

	// Obstacles generation
	scene.events.on(EVENTS.GENERATE_OBSTACLE, () => {
		const uuid = Phaser.Math.RND.uuid()

		Object.assign(obstaclesTweens.value, {
			[uuid]: {
				props: {
					x: { getEnd: () => -100 },
				},
				duration: 2000,
				onComplete: () => {
					destroyObstacle(uuid)
				},
			},
		})

		obstacles.value.push({
			x: 820,
			y: game.scale.height - 16,
			uuid,
		})
	})

	scene.events.on(EVENTS.CREATED_OBSTACLE, elem => {
		obstaclesGroup.add(elem)
	})

	// Coins generation
	scene.events.on(EVENTS.GENERATE_COIN, () => {
		const uuid = Phaser.Math.RND.uuid()

		Object.assign(coinTweens.value, {
			[uuid]: {
				props: {
					x: { getEnd: () => 50 },
				},
				duration: 2000,
				onComplete: () => {
					destroyCoin(uuid)
				},
			},
		})

		coins.value.push({
			x: 820,
			y: game.scale.height - 64,
			alpha: 1 / Phaser.Math.Between(1, 3),
			uuid,
		})
	})

	scene.events.on(EVENTS.CREATED_COIN, elem => {
		coinsGroup.add(elem)
	})

	generator = new Generator(scene)
}

//
// Methods
//
function destroyCloud(uuid) {
	clouds.value = clouds.value.filter(cloud => cloud.uuid !== uuid)
	delete cloudTweens.value[uuid]
}

function destroyObstacle(uuid) {
	obstacles.value = obstacles.value.filter(obstacle => obstacle.uuid !== uuid)
	delete obstaclesTweens.value[uuid]
}

function destroyCoin(uuid) {
	coins.value = coins.value.filter(coin => coin.uuid !== uuid)
	delete coinTweens.value[uuid]
}

function hitObstacle(player, obstacle) {
	updateScoreEvent.destroy()
	gameOver()
}

function hitCoin(player, coin) {
	sounds.coin.play()
	updateScore(1000)
	coin.destroy()
}

function updateScore(points = 1) {
	score.value += points
	scoreText.value.setText(score.value)
}

function gameOver() {
	sceneRef.value.events.off(EVENTS.GENERATE_CLOUD)
	sceneRef.value.events.off(EVENTS.GENERATE_OBSTACLE)
	sceneRef.value.events.off(EVENTS.GENERATE_COIN)

	playerCoinsCollider.destroy()
	playerObstaclesCollider.destroy()

	generator.destroy()

	clouds.value = []
	cloudTweens.value = {}
	coins.value = []
	coinTweens.value = {}
	obstacles.value = []
	obstaclesTweens.value = {}

	sounds.theme.stop()
	sounds.dead.play()

	game.registry.set('score', score.value)

	game.scene.start(SCENES.GAME_OVER)
	game.scene.stop(SCENES.MAIN)
}
</script>

<template>
	<Scene
		:name="SCENES.MAIN"
		@preload="onPreload"
		@create="onCreate"
		ref="sceneRef"
	>
		<Player :x="game.scale.width * 0.5 - 100" :y="game.scale.height * 0.5" />

		<Cloud
			v-for="cloud in clouds"
			:x="cloud.x"
			:y="cloud.y"
			:alpha="cloud.alpha"
			:scale="cloud.scale"
			:tween="cloudTweens[cloud.uuid]"
			:key="cloud.uuid"
		/>

		<Obstacle
			v-for="obstacle in obstacles"
			:x="obstacle.x"
			:y="obstacle.y"
			:tween="obstaclesTweens[obstacle.uuid]"
			:key="obstacle.uuid"
		/>

		<Coin
			v-for="coin in coins"
			:x="coin.x"
			:y="coin.y"
			:tween="coinTweens[coin.uuid]"
			:key="coin.uuid"
		/>
	</Scene>
</template>
