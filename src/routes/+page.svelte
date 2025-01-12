<script lang="ts">
  import { read_app_config } from "$lib/app_config";
  import { info } from "@tauri-apps/plugin-log";
  import { onMount } from "svelte";

  const app_config = $state({ blackboard_download_dir: "" });

  onMount(async () => {
    try {
      const config = await read_app_config();
    } catch (err: any) {
      info(err.toString());
    }
  });
</script>

<main class="container">
  <h1>Welcome to Tauri + Svelte</h1>
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
