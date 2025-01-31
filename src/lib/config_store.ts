import { writable, type Writable } from "svelte/store";
import { read_app_config, type AppConfig } from "./app_config";

export let app_config: Writable<AppConfig> = writable();
