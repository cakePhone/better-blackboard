import { writable, type Writable } from "svelte/store";
import type { FileTree } from "./file-system";

export let classes_store: Writable<FileTree[]> = writable([])
