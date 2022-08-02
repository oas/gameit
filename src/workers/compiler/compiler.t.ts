//
// Messaging
//
import {DecisionModel} from "./types/DecisionModel";

export enum WorkerMessageType {
	COMPILE_MODEL,
	MODEL_COMPILED,
	UPDATE_PATH,
	MODEL_EXPORTED
}

export interface WorkerMessage {
	type: WorkerMessageType;
}

export interface CompileModelMessage extends WorkerMessage {
	type: WorkerMessageType.COMPILE_MODEL;
	data: string;
}

export interface ModelCompiledMessage extends WorkerMessage {
	type: WorkerMessageType.MODEL_COMPILED;
	data: DecisionModel;
}

export interface UpdatePathMessage extends WorkerMessage {
	type: WorkerMessageType.UPDATE_PATH;
	path: string;
	value: any;
}

export interface ModelExportedMessage extends WorkerMessage {
	type: WorkerMessageType.MODEL_EXPORTED;
	data: string;
}

//
// Types
//
export interface ModelProperties {
	prefix: string,
	version: string;

	getChild(node: any, key: string): any[];
	getKey(key: string): string;
	setChild(node: any, key: string, value: any[]): void;
	deleteChild(node: any, key: string): void;
	hasChanged(): void;
}
