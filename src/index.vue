<template>
<div>
	<input type="text" v-on:input="up($event.target.value)">
	<pre>{{JSON.stringify(model, null, 2)}}</pre>
	<pre>{{source}}</pre>
</div>
</template>

<script setup lang="ts">
import Compiler from './workers/compiler/compiler.ts?worker'
import {onMounted, ref} from "vue";
import {CompileModelMessage, ModelCompiledMessage, ModelExportedMessage, UpdatePathMessage, WorkerMessage, WorkerMessageType} from "./workers/compiler/compiler.t";
import {DecisionModel} from "./workers/compiler/types/DecisionModel";

const model = ref<DecisionModel|null>(null);
const source = ref<string|null>(null);
const worker = ref<Worker|null>(null);

onMounted(async () => {
	worker.value = new Compiler();
	worker.value.addEventListener("message", event => {
		const message: WorkerMessage = event.data;
		console.info("main", "received message", message);


		switch (message.type) {
			case WorkerMessageType.MODEL_COMPILED: {
				const typedMessage = message as ModelCompiledMessage;
				model.value = typedMessage.data;
				break;
			}
			case WorkerMessageType.MODEL_EXPORTED: {
				const typedMessage = message as ModelExportedMessage;
				source.value = typedMessage.data;
				break;
			}
		}
	});

	const response = await fetch("/0003-input-data-string-allowed-values.dmn");

	worker.value.postMessage({
		type: WorkerMessageType.COMPILE_MODEL,
		data: await response.text()
	} as CompileModelMessage);
})

function up(text: string) {
	console.info(text);
	worker.value!.postMessage({
		type: WorkerMessageType.UPDATE_PATH,
		path: "$._.name",
		value: text
	} as UpdatePathMessage);
}


</script>

<style lang="scss" scoped>
body {
  background-color: #fafafa;
}
</style>
