<script lang="ts">
  import type { FileTree } from "$lib/file-system";
  import Icon from "@iconify/svelte";

  type SidebarProps = {
    classes: FileTree[];
  };

  let { classes }: SidebarProps = $props();

  let collapsed: boolean = $state(false);

  let collapse_icon: string = $derived(
    collapsed ? "mynaui:panel-left-open" : "mynaui:panel-left-close",
  );
</script>

<div class="main" class:collapsed>
  {#if !collapsed}
    <h2>Classes</h2>
    <div class="classes__container">
      {#each classes as c}
        <a href={`classes/${encodeURI(c.info?.name ?? "")}`}>
          {c.info?.name}
        </a>
      {/each}
    </div>
  {/if}
  <button
    class="collapse_button"
    title={collapsed ? "Open Sidebar" : "Collapse Sidebar"}
    onmousedown={() => (collapsed = !collapsed)}
  >
    <Icon icon={collapse_icon} height="100%" />
  </button>
</div>

<style>
  .main {
    --padding-top: 0.5rem;

    position: relative;
    background: var(--grey-200);
    color: white;

    padding: var(--padding-top) 1.25rem;

    height: calc(100vh - 2 * var(--padding-top));

    border-right: 1px solid var(--grey-300);
  }

  .classes__container {
    display: grid;
    row-gap: 1rem;
  }

  .collapsed {
    width: 2rem;
  }

  .collapse_button {
    position: absolute !important;
    top: 1.25rem;
    right: 1.25rem;

    border: none;
    outline: none;

    height: 2rem;
    width: 2rem;

    color: var(--text-light);

    display: grid;
    align-items: center;

    border-radius: 0.5rem;

    background: var(--grey-200);
  }

  a {
    display: block;

    text-decoration: none;

    padding: 0.7rem 1rem 0.5rem 1rem;

    border-radius: 1rem;

    color: var(--text-light);
    background: var(--grey-400);
  }

  @media (prefers-color-scheme: dark) {
    .main {
      background: var(--grey-950);
      border-right-color: var(--grey-800);
    }

    .collapse_button {
      color: var(--text-dark);
      background: var(--grey-800);
    }

    .collapse_button:hover {
      background: var(--grey-700);
    }

    a {
      color: var(--text-dark);
      background: var(--grey-900);
    }
    a:hover {
      background: var(--grey-800);
    }
  }
</style>
