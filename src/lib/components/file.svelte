<script lang="ts">
  import { type FileData } from "$lib/file-system";

  type FileDisplayProps = {
    file_info: FileData;
  };

  let { file_info }: FileDisplayProps = $props();
</script>

<p>{file_info.name}</p>
