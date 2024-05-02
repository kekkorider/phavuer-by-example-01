<script setup>
import { Rectangle } from 'phavuer'

defineEmits(['destroy'])
</script>

<template>
	<Rectangle :fillColor="0xffffff" :width="98" :height="32" />
</template>
