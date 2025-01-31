<script lang="ts">
  import { type FileTree } from "$lib/file-system";
  import FileTreeDisplay from "./fileTreeDisplay.svelte";
  import File from "./file.svelte";

  const { file_tree }: { file_tree: FileTree } = $props();
</script>

<ul>
  {#if file_tree.info}
    <li>
      {file_tree.info.name}
    </li>
  {/if}

  {#each file_tree.nodes as node}
    <li>
      {#if file_tree.info?.isFile}
        <File file_info={file_tree.info} />
      {/if}
      <FileTreeDisplay file_tree={node} />
    </li>
  {/each}
</ul>

<style>
  li {
    text-align: left;
  }
</style>
