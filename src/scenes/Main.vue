<script setup>
import { Scene, refScene } from 'phavuer'
import { ref } from 'vue'

import { SCENES, EVENTS } from '../constants'
import Generator from '../assets/Generator'

import Player from '../components/Player.vue'
import Cloud from '../components/Cloud.vue'

const scene = refScene()
const clouds = ref([])

const cloudTween = ref({
	props: {
		x: { getEnd: () => 100 },
	},
	duration: 2000 / alpha,
	onComplete: tween => {
		scene.value.events.emit(EVENTS.DESTROY_CLOUD, tween.targets[0].uuid)
	},
})

function onCreate(scene) {
	scene.events.on(EVENTS.GENERATE_CLOUD, () => {
		const alpha = 1 / Phaser.Math.Between(1, 3)

		clouds.value.push({
			x: 800,
			y: Phaser.Math.Between(0, 100),
			alpha,
			scale: alpha,
			uuid: Phaser.Math.RND.uuid(),
		})
	})

	scene.events.on(EVENTS.DESTROY_CLOUD, uuid => {
		clouds.value = clouds.value.filter(item => item.uuid !== uuid)
	})

	new Generator(scene)
}
</script>

<template>
	<Scene :name="SCENES.MAIN" @create="onCreate" ref="scene">
		<Player :x="300" :y="150" />

		<Cloud
			v-for="cloud in clouds"
			:x="cloud.x"
			:y="cloud.y"
			:alpha="cloud.alpha"
			:scale="cloud.alpha"
			:uuid="cloud.uuid"
			:tween="cloudTween"
		/>
	</Scene>
</template>
