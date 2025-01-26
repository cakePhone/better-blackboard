<script lang="ts">
  import type { FileTree } from "$lib/file-system";
  import Directory from "./directory.svelte";
  import File from "./file.svelte";
  import Icon from "@iconify/svelte";

  type DirectoryProps = {
    dir: FileTree;
  };

  let { dir }: DirectoryProps = $props();

  let open = $state(false);

  let folder_icon: string = $derived(
    open ? "mynaui:folder" : "mynaui:folder-solid",
  );
</script>

<div class="parent">
  <button onmousedown={() => (open = !open)}>
    <Icon icon={folder_icon} height="1rem" />
    {dir.info?.name}
    <Icon icon="mynaui:chevron-down" />
  </button>
  {#if open}
    <div class="children">
      {#each dir.nodes as child}
        {#if child.info?.isDirectory}
          <Directory dir={child} />
        {:else}
          <File file={child} />
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .parent {
  }

  .children {
    margin-left: 1rem;
  }

  button {
    display: flex;

    gap: 1rem;

    height: 100%;
    width: 100%;

    padding: 1rem;
  }

  @media (prefers-color-scheme: dark) {
    .parent {
      background: var(--grey-800);
    }
  }
</style>
