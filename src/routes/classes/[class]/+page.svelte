<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import { classes_store } from "$lib/classes_store";
  import Directory from "$lib/components/directory.svelte";
  import File from "$lib/components/file.svelte";
  import type { FileTree } from "$lib/file-system";

  let class_title = $derived(page.params.class);

  let content: FileTree[] = $state(
    $classes_store.find((obj) => obj.info?.name == class_title)?.nodes ?? [],
  );

  afterNavigate(() => {
    content =
      $classes_store.find((obj) => obj.info?.name == class_title)?.nodes ?? [];
  });
</script>

<h1>{class_title}</h1>
{#each content as c}
  {#if c.info?.isDirectory}
    <Directory dir={c} />
  {:else}
    <File file={c} />
  {/if}
{/each}
