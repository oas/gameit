<template>
<div class="root-container">
	<div class="text-container">
		<img src="/logo.png" class="logo" style="margin-bottom: 5vh">
		<p class="title">
			Es ist <b>{{ clock }}</b> Uhr.
		</p>
		<p class="title" style="margin-bottom: 10vh">
			Die Pause beginnt {{ relativeTime }} (um {{ time }} Uhr).
		</p>
		<p class="title">
			<b>GitHub:</b> github.com/jugj
		</p>
	</div>
	<img src="/9.gif" style="position: absolute; bottom: -4vh; left: 10vw; height: 20vh;">
	<img src="/6.gif" style="position: absolute; bottom: -3vh; right: 10vw; height: 20vh;">
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
const relativeTime = ref<string>("...");
const time = ref<string>("...");

onMounted(async () => {
	setInterval(() => {
		clock.value = dayjs().toDate().toLocaleTimeString();

		const end = "2022-08-04T19:29:25+02:00";
		relativeTime.value = dayjs().to(dayjs(end));
		time.value = dayjs(end).toDate().toLocaleTimeString();
	}, 1000);
})
</script>

<style lang="scss">
body {
  background-color: #fff;
  margin: 0;
  font-family: 'Nunito', sans-serif;
	overflow: hidden;
}

p {
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
  display: flex;
  flex-direction: column;
  align-items: center;

  & .logo {
    width: 50vh;
  }

  & .title {
    font-size: 4vh;
  }
}

</style>
