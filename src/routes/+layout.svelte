<script lang="ts">
  import { read_app_config, type AppConfig } from "$lib/app_config";
  import { read_class_cache, write_class_cache } from "$lib/app_cache";
  import { make_file_tree, type FileTree } from "$lib/file-system";
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";
  import Sidebar from "$lib/components/sidebar.svelte";

  import "../styles/main.css";

  let { children } = $props();

  let app_config: AppConfig = $state({ blackboard_download_dir: "" });
  let cached: FileTree | undefined = $state();
  let dirs: FileTree | undefined = $state();
  let classes: FileTree[] = $derived(
    dirs?.nodes.flatMap((year) => year.nodes) ??
      cached?.nodes.flatMap((year) => year.nodes) ??
      [],
  );

  onMount(async () => {
    try {
      const app_config = await read_app_config();

      cached = await read_class_cache();

      dirs = await make_file_tree(app_config.blackboard_download_dir);

      await write_class_cache(dirs);
    } catch (err: any) {
      info(err.toString());
    }
  });
</script>

<main class="container">
  <Sidebar {classes} />
  {@render children()}
</main>

<style>
  main {
    display: flex;
  }
</style>
