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

  let links_to: string | undefined = $derived(file?.info?.links_to);

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
    if (!file?.info?.isLink) {
      e.preventDefault();
      openFile(`${file?.info?.path ?? ""}/${file?.info?.name ?? ""}`);
    } else {
      info(`Clicked a link: ${file?.info?.links_to}`);
    }
  }}
>
  <Icon icon="mynaui:file" height="1.5rem" style="min-width: 1.5rem;" />
  <p>{file?.info?.name}</p>
</button>

{#if file?.info?.isLink}
  <div popover="auto" id="popover">
    <embed src={links_to} />
  </div>
{/if}

<style>
  button {
    display: flex;
    align-items: center;

    width: 100%;

    gap: 1rem;
    padding: 1rem;

    border-top: 2px solid var(--grey-300);
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    text-align: start;

    margin: 0;
  }

  #popover {
    position: fixed;

    top: 50%;
    left: 50%;

    translate: -50% -50%;

    padding: 0;
    margin: 0;
    width: 60vw;
    height: 80vh;
  }

  embed {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 600px) {
    button {
    }
  }

  @media (prefers-color-scheme: dark) {
    button {
      border-color: var(--grey-700);
    }
  }
</style>
