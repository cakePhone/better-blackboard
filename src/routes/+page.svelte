<script lang="ts">
  import { read_app_config, type AppConfig } from "$lib/app_config";
  import { make_file_tree, type FileTree } from "$lib/file-system";
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";
  import FileTreeDisplay from "$lib/components/fileTreeDisplay.svelte";

  let app_config: AppConfig = $state({ blackboard_download_dir: "" });
  let dirs: FileTree = $state([]);

  onMount(async () => {
    try {
      const config = await read_app_config();
      app_config = config;

      dirs = await make_file_tree(config.blackboard_download_dir);
      info(JSON.stringify(dirs, null, 2));
    } catch (err: any) {
      info(err.toString());
    }
  });
</script>

<main class="container">
  <h1>Welcome to Tauri + Svelte</h1>
  <p>{JSON.stringify(app_config)}</p>
  <br />
  {#if dirs}
    <FileTreeDisplay file_tree={dirs} />
  {/if}
</main>

<style>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #f6f6f6;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .container {
    margin: 0;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
</style>
