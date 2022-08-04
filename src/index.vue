<template>
<div class="root-container">
	<div class="text-container">
		<p>GAME</p>
		<p>{{clock}}</p>
		<p>{{time}}</p>
	</div>
</div>
</template>

<script setup lang="ts">
	import {onMounted, ref} from "vue";
	import dayjs from "dayjs";
	import dayjsRelativeTimePlugin from "dayjs/plugin/relativeTime";
	import "dayjs/locale/de";

	dayjs.extend(dayjsRelativeTimePlugin);
	dayjs.locale('de');

	const clock = ref<string>("...");
	const time = ref<string>("...");

	onMounted(async () => {
		setInterval(() => {
			clock.value = dayjs().toDate().toLocaleTimeString();
			time.value = dayjs().to(dayjs("2022-08-04T18:29:25+02:00"));
		}, 1000);
	})
</script>

<style lang="scss">
  body {
    background-color: #ddd;
    margin: 0;
  }

  .root-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .text-container {

  }

</style>
