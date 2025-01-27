import { writable, type Writable } from "svelte/store";
import type { FileTree } from "./file-system";

export let current_class_store: Writable<string> = writable("")

export let classes_store: Writable<FileTree[]> = writable([])
