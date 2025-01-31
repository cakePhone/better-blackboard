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

<style>
  .page {
    max-width: 1024px;
    min-width: 300px;
    width: calc(100% - 2rem);

    padding-inline: 1rem;
    padding-block: 0;

    margin-inline: auto;
  }

  div {
    display: flex;

    flex-direction: column;
    gap: 1rem;

    max-width: 100%;
    padding-block: 1rem;
  }

  h1 {
    margin: 0;
    margin-top: 1.7rem;

    width: fit-content;
  }
</style>
