<script lang="ts">
  import { read_app_config, type AppConfig } from "$lib/app_config";
  import { make_file_tree, type FileTree } from "$lib/file-system";
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";
  import Sidebar from "$lib/components/sidebar.svelte";

  let app_config: AppConfig = $state({ blackboard_download_dir: "" });
  let dirs: FileTree = $state(Object.create(null));
  let classes: FileTree[] = $state([]);

  onMount(async () => {
    try {
      const config = await read_app_config();
      app_config = config;

      dirs = await make_file_tree(config.blackboard_download_dir);

      classes = dirs.nodes.flatMap((year) => year.nodes);

      info(JSON.stringify(classes, null, 2));
    } catch (err: any) {
      info(err.toString());
    }
  });
</script>

<main class="container">
  <Sidebar {classes} />
  <!-- <MainDisplay selected_class={} /> -->
</main>

<style global>
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: var(--text-light);
    background-color: var(--grey-50);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    /* Neutral Grey Shades */
    --grey-50: #fcfcfc;
    --grey-100: #f8f8f8;
    --grey-200: #f0f0f0;
    --grey-300: #e0e0e0;
    --grey-400: #c0c0c0;
    --grey-500: #a0a0a0;
    --grey-600: #808080;
    --grey-700: #606060;
    --grey-800: #404040;
    --grey-900: #202020;
    --grey-950: #101010;

    /* Blue Accent */
    --blue-50: #eff6ff;
    --blue-100: #dbeafe;
    --blue-200: #bfdbfe;
    --blue-300: #93c5fd;
    --blue-400: #60a5fa;
    --blue-500: #3b82f6;
    --blue-600: #2563eb;
    --blue-700: #1d4ed8;
    --blue-800: #1e40af;
    --blue-900: #1e3a8a;
    --blue-950: #172554;

    --text-dark: #fefefe;
    --text-light: #0f0f0f;
  }

  .container {
    margin: 0;
    padding: 0;
  }

  main {
    display: grid;
    columns: 2;
    grid-template-columns: 20% 80%;
  }

  button {
    padding: none;
    border: none;
    outline: none;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: var(--text-dark);
      background-color: var(--grey-900);
    }
  }
</style>
