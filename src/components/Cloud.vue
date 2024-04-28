<script setup>
import { Rectangle, refObj } from 'phavuer'
import { watch } from 'vue'

const props = defineProps({
	uuid: {
		type: String,
		required: true,
	},
})

const cloudRef = refObj()

const cloudWatcher = watch(cloudRef, value => {
	value.uuid = props.uuid
	cloudWatcher()
})
</script>

<template>
	<Rectangle :fillColor="0xffffff" :width="98" :height="32" ref="cloudRef" />
</template>
