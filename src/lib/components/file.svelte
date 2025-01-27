<script lang="ts">
  import { type FileTree } from "$lib/file-system";
  import Icon from "@iconify/svelte";
  import { BaseDirectory, documentDir } from "@tauri-apps/api/path";
  import { exists, readTextFile } from "@tauri-apps/plugin-fs";
  import { info } from "@tauri-apps/plugin-log";
  import { open } from "@tauri-apps/plugin-shell";
  import { onMount } from "svelte";

  type FileDisplayProps = {
    file: FileTree | undefined;
  };

  let { file }: FileDisplayProps = $props();

  let document_directory: string = $state("");

  async function openFile(file: string | undefined) {
    if (file == "/" || typeof file == "undefined") return;

    info(document_directory + "/" + file);

    await open(document_directory + "/" + file);
  }

  onMount(async () => {
    document_directory = await documentDir();
  });
</script>

<button
  popovertarget="popover"
  onmousedown={(e) => {
    if (!file?.info?.isUltraDocumentBody) {
      e.preventDefault();
      openFile(`${file?.info?.path ?? ""}/${file?.info?.name ?? ""}`);
    }
    info(
      `${document_directory + "/" + file?.info?.path + "/" + file?.info?.name}/ultraDocumentBody.html`,
    );
  }}
>
  <Icon icon="mynaui:file" height="1.5rem" />
  <p>{file?.info?.name}</p>
</button>

{#if file?.info?.isUltraDocumentBody}
  <div popover="auto" id="popover">
    {#await readTextFile( `${file?.info?.path}/${file?.info?.name}/ultraDocumentBody.html`, { baseDir: BaseDirectory.Document }, ) then content}
      <p>{content}</p>
    {/await}
  </div>
{/if}

<style>
  button {
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

  #popover {
    width: 60vw;
    height: 80vh;
  }
</style>
