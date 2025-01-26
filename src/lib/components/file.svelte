<script lang="ts">
  import { type FileTree } from "$lib/file-system";
  import Icon from "@iconify/svelte";

  type FileDisplayProps = {
    file: FileTree | undefined;
  };

  let { file }: FileDisplayProps = $props();
</script>

<div>
  <Icon icon="mynaui:file" />
  {file?.info?.name}
</div>
