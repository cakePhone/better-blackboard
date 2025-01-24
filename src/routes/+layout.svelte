<script lang="ts">
  import { read_app_config, type AppConfig } from "$lib/app_config";
  import { read_cache, write_cache_file } from "$lib/app_cache";
  import { make_file_tree, type FileTree } from "$lib/file-system";
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";
  import Sidebar from "$lib/components/sidebar.svelte";

  import "../styles/main.css";

  let { children } = $props();

  let app_config: AppConfig = $state({ blackboard_download_dir: "" });

  let cached_directory_tree: FileTree | undefined = $state();
  let bb_directory_tree: FileTree | undefined = $state();

  // read from cache until the file tree gets built
  // if cache doesn't exist, default to empty
  let classes: FileTree[] = $derived(
    bb_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      cached_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      [],
  );

  onMount(async () => {
    try {
      const app_config = await read_app_config();

      cached_directory_tree = (await read_cache(
        "cached_directory_tree.json",
      )) as FileTree;

      bb_directory_tree = await make_file_tree(
        app_config.blackboard_download_dir,
      );

      // make sure to update the cache by the end
      await write_cache_file("cached_directory_tree", bb_directory_tree);
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
