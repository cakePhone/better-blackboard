<script lang="ts">
  import type { FileTree } from "$lib/file-system";
  import { info } from "@tauri-apps/plugin-log";
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
    <Icon icon={folder_icon} height="1.5rem" style="min-width: 1.5rem;" />
    <p>{dir.info?.name}</p>
    <Icon
      icon="mynaui:chevron-down"
      height="1.5rem"
      style={`rotate: ${chevron_rotation}; flex-shrink: 0;`}
    />
  </button>
  {#if open}
    <div class="children">
      {#each dir.nodes as child}
        {#if child.info?.isDirectory && !child.info.isUltraDocumentBody}
          <Directory dir={child} depth={depth + 1} />
        {:else}
          <File file={child} />
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .parent {
    border-radius: 0.5rem;
    background: var(--grey-300);

    font-size: 1rem;
  }

  .children {
    padding-left: 1rem;
  }

  button {
    display: flex;

    gap: 1rem;

    height: 3rem;
    width: 100%;

    padding: 1rem;

    background: var(--grey-300);
  }

  p {
    text-align: start;
  }

  @media (prefers-color-scheme: dark) {
    .parent {
      background: var(--grey-800);
    }

    button {
      background: var(--grey-800);
    }
  }
</style>
