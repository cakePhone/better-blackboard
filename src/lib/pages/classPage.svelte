<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { classes_store } from "$lib/classes_store";
  import Directory from "$lib/components/directory.svelte";
  import File from "$lib/components/file.svelte";
  import type { FileTree } from "$lib/file-system";

  let { render_class } = $props();

  let content: FileTree[] = $derived(
    $classes_store.find((obj) => obj.info?.name == render_class)?.nodes ?? [],
  );

  afterNavigate(() => {});
</script>

<div class="layout">
  <div class="page">
    <h1>{render_class}</h1>
    <div>
      {#each content as c}
        {#if c.info?.isDirectory}
          <Directory dir={c} depth={0} />
        {:else}
          <File file={c} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .layout {
    display: flex;

    max-height: 100vh;
    max-width: 1024px;
    min-width: 400px;
    width: 100%;
    padding: 0.75rem;

    margin-inline: auto;

    overflow-y: scroll;
  }

  .page {
    padding-inline: 2rem;

    flex-grow: 1;
  }

  div {
    display: grid;
    max-width: 100%;
    gap: 1rem;

    padding-block: 1rem;
  }

  h1 {
    margin: 0;
  }
</style>
