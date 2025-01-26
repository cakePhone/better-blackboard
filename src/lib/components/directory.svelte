<script lang="ts">
  import type { FileTree } from "$lib/file-system";
  import Directory from "./directory.svelte";
  import File from "./file.svelte";
  import Icon from "@iconify/svelte";

  type DirectoryProps = {
    dir: FileTree;
    depth: number;
  };

  let { dir, depth }: DirectoryProps = $props();

  let open = $state(false);

  let folder_icon: string = $derived(
    open ? "mynaui:folder-two" : "mynaui:folder-two-solid",
  );

  let chevron_rotation: string = $derived(open ? "180deg" : "");
</script>

<div class="parent" style={`--depth: ${depth}`}>
  <button onmousedown={() => (open = !open)}>
    <Icon icon={folder_icon} height="1.5rem" />
    <p>{dir.info?.name}</p>
    <Icon
      icon="mynaui:chevron-down"
      height="1.5rem"
      style={`rotate: ${chevron_rotation}`}
    />
  </button>
  {#if open}
    <hr />
    <div class="children">
      {#each dir.nodes as child}
        {#if child.info?.isDirectory}
          <Directory dir={child} depth={depth + 1} />
        {:else}
          <File file={child} />
        {/if}
        <hr />
      {/each}
    </div>
  {/if}
</div>

<style>
  .parent {
    border-radius: 0.5rem;

    font-size: 1rem;
  }

  .children {
    display: grid;
    padding-left: 1rem;
  }

  button {
    display: flex;

    gap: 1rem;

    height: 3rem;

    width: 100%;

    padding: 1rem;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: calc(100% - 1rem * var(--depth));
  }

  hr {
    margin: 0;
    border: 1px solid var(--grey-200);
  }

  @media (prefers-color-scheme: dark) {
    .parent {
      background: var(--grey-800);
    }

    hr {
      border-color: var(--grey-900);
    }
  }
</style>
