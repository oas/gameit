import {Builder, Parser} from 'xml2js';
import {CompileModelMessage, ModelProperties, UpdatePathMessage, WorkerMessage, WorkerMessageType} from "./compiler.t";
import {NamedElement} from "./types/NamedElement";
import JSONPath from "jsonpath";
import {DecisionModel} from "./types/DecisionModel";

let model:DecisionModel|null = null;

addEventListener('message', async (event) => {
	const message: WorkerMessage = event.data;
	console.info("compiler", "received message", message);

	switch (message.type) {
		case WorkerMessageType.COMPILE_MODEL: {
			const typedMessage = message as CompileModelMessage;

			const dom = await new Parser({
				attrkey: "_",
				charkey: "__",
			}).parseStringPromise(typedMessage.data);
			const definitions = dom.definitions;
			if (definitions === undefined) {
				throw new Error("Can't parse DMN model. Is the model valid?");
			}

			model = new DecisionModel(definitions, getModelProperties(definitions));

			postMessage({
				type: WorkerMessageType.MODEL_COMPILED,
				data: JSON.parse(JSON.stringify(model, (key, value) => {
					if (["raw", "properties"].includes(key)) {
						return undefined;
					}
					return value;
				}))
			})
			console.info(model!.raw);
			postMessage({
				type: WorkerMessageType.MODEL_EXPORTED,
				data: new Builder({
					attrkey: "_",
					charkey: "__",
				}).buildObject({[model!.properties.prefix + "definitions"]: model!.raw})
			})
			break;
		}
		case WorkerMessageType.UPDATE_PATH: {
			const typedMessage = message as UpdatePathMessage;
			model!.update(typedMessage.path, typedMessage.value);

			postMessage({
				type: WorkerMessageType.MODEL_COMPILED,
				data: JSON.parse(JSON.stringify(model, (key, value) => {
					if (["raw", "properties"].includes(key)) {
						return undefined;
					}
					return value;
				}))
			})
			postMessage({
				type: WorkerMessageType.MODEL_EXPORTED,
				data: new Builder({
					attrkey: "_",
					charkey: "__",
				}).buildObject({[model!.properties.prefix + "definitions"]: model!.raw})
			})
			break;
		}
	}
});

function getModelProperties(dom: any): ModelProperties {
	const attributes = dom._;
	for (const key in attributes) {
		let version;
		switch (attributes[key]) {
			case "http://www.omg.org/spec/DMN/20151101/dmn.xsd": {
				version = "1.1";
				break;
			}
			case "http://www.omg.org/spec/DMN/20180521/MODEL/": {
				version = "1.2";
				break;
			}
			case "https://www.omg.org/spec/DMN/20191111/MODEL/": {
				version = "1.3";
				break;
			}
		}
		if (version === undefined) {
			continue;
		}

		const prefix = key.indexOf(":") === -1 ? "" : (key.split(":")[1] + ":");
		return {
			prefix: prefix,
			version: version,
			getChild(node: any, key: string): any[] {
				return node[prefix + key];
			},
			getKey(key: string): string {
				return prefix + key;
			},
			hasChanged() {
			},
			setChild(node: any, key: string, value: any[]) {
				node[prefix + key] = value;
			},
			deleteChild(node: any, key: string) {
				delete node[prefix + key];
			}
		}
	}

	throw new Error("Can't parse DMN version (detected " + JSON.stringify(attributes) + "). Is the model valid?");
}
