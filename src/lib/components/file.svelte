<script lang="ts">
  import { type FileTree } from "$lib/file-system";
  import Icon from "@iconify/svelte";

  type FileDisplayProps = {
    file: FileTree | undefined;
  };

  let { file }: FileDisplayProps = $props();
</script>

<div>
  <Icon icon="mynaui:file" height="1.5rem" />
  <p>{file?.info?.name}</p>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 30rem;
    margin: 0;
  }
</style>
