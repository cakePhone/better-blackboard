<script lang="ts">
  // Libs
  import { read_app_config, type AppConfig } from "$lib/app_config";
  import { read_cache, write_cache_file } from "$lib/app_cache";
  import { make_file_tree, type FileTree } from "$lib/file-system";
  import { classes_store } from "$lib/classes_store";

  // Frameworks
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";

  // Components
  import Sidebar from "$lib/components/sidebar.svelte";

  // styles
  import "../styles/main.css";
  import { app_config } from "$lib/config_store";
  import { onNavigate } from "$app/navigation";

  let { children } = $props();

  let cached_directory_tree: FileTree | undefined = $state();
  let bb_directory_tree: FileTree | undefined = $state();

  // read from cache until the file tree gets built
  // if cache doesn't exist, default to empty
  $effect(() => {
    $classes_store =
      bb_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      cached_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      [];
  });

  async function setup() {
    $app_config = await read_app_config();

    cached_directory_tree = (await read_cache(
      "cached_directory_tree.json",
    )) as FileTree;

    bb_directory_tree = await make_file_tree(
      $app_config.blackboard_download_dir,
    );

    $classes_store =
      bb_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      cached_directory_tree?.nodes?.flatMap((year) => year.nodes) ??
      [];

    // make sure to update the cache by the end
    await write_cache_file("cached_directory_tree.json", bb_directory_tree);
  }

  onMount(async () => {
    try {
      await setup();
    } catch (err: any) {
      info(err.toString());
    }
  });
</script>

<main class="container">
  <Sidebar classes={$classes_store} />
  {@render children()}
</main>

<style>
  main {
    display: flex;
  }
</style>
