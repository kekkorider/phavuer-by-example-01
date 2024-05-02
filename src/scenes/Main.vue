<script setup>
import { Scene, useGame } from 'phavuer'
import { ref } from 'vue'

import { SCENES, EVENTS } from '../constants'
import Generator from '../assets/Generator'

import Player from '../components/Player.vue'
import Cloud from '../components/Cloud.vue'
import Obstacle from '../components/Obstacle.vue'

const game = useGame()

const clouds = ref([])
const cloudTweens = ref({})

const obstacles = ref([])
const obstaclesTweens = ref({})

function onCreate(scene) {
	// Clouds generation
	scene.events.on(EVENTS.GENERATE_CLOUD, () => {
		const alpha = 1 / Phaser.Math.Between(1, 3)
		const uuid = Phaser.Math.RND.uuid()

		Object.assign(cloudTweens.value, {
			[uuid]: {
				props: {
					x: { getEnd: () => 50 },
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
			scale: alpha,
			uuid,
		})
	})

	// Obstacles generation
	scene.events.on(EVENTS.GENERATE_OBSTACLE, () => {
		const uuid = Phaser.Math.RND.uuid()

		Object.assign(obstaclesTweens.value, {
			[uuid]: {
				props: {
					x: { getEnd: () => 50 },
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

	new Generator(scene)
}

function destroyCloud(uuid) {
	clouds.value = clouds.value.filter(cloud => cloud.uuid !== uuid)
	delete cloudTweens.value[uuid]
}

function destroyObstacle(uuid) {
	obstacles.value = obstacles.value.filter(obstacle => obstacle.uuid !== uuid)
	delete obstaclesTweens.value[uuid]
}
</script>

<template>
	<Scene :name="SCENES.MAIN" @create="onCreate">
		<Player :x="300" :y="150" />

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
	</Scene>
</template>
