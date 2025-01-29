<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { current_class_store } from "$lib/classes_store";
  import type { FileTree } from "$lib/file-system";
  import Icon from "@iconify/svelte";

  type SidebarProps = {
    classes: FileTree[];
  };

  let { classes }: SidebarProps = $props();
  let collapsed = $state(false);

  let winWidth: number = $state(0);
  let isMobile: boolean = $derived(winWidth < 600);

  let collapse_icon: string = $derived(
    collapsed ? "mynaui:panel-left-open" : "mynaui:panel-left-close",
  );

  // Collapse sidebar when a mobile user clicks a link
  afterNavigate(() => {
    if (isMobile) {
      collapsed = true;
    }
  });
</script>

<svelte:window bind:innerWidth={winWidth} />

<div class="main" class:collapsed>
  <div class="sidebar_title">
    <h1>Classes</h1>
    <!-- Normal Icon -->
    <button
      class="collapse_button"
      title={collapsed ? "Open Sidebar" : "Collapse Sidebar"}
      onmousedown={() => (collapsed = !collapsed)}
    >
      <Icon icon={collapse_icon} height="1.25rem" width="1.25rem" />
    </button>

    <!-- Mobile Icon -->
    <button
      class="hamburger_button"
      title={collapsed ? "Open Sidebar" : "Collapse Sidebar"}
      onmousedown={() => (collapsed = !collapsed)}
    >
      <Icon icon="mynaui:menu" height="100%" />
    </button>
  </div>

  {#if classes.length == 0}
    <p>No classes found...</p>
  {:else}
    <nav>
      {#each classes as c}
        <button
          class="link"
          title={c.info?.name}
          onmousedown={() => ($current_class_store = c.info?.name ?? "")}
        >
          {collapsed ? c.info?.name.charAt(1) : c.info?.name}
        </button>
      {/each}
    </nav>
  {/if}
</div>

<style>
  * {
    transition: all 100ms ease-out;
  }

  .main {
    --padding-top: 1.25rem;

    position: relative;
    background: var(--grey-300);
    color: white;

    flex: 0;

    padding: var(--padding-top) 1.25rem;

    height: calc(100vh - 2 * var(--padding-top));
    min-width: 14rem;
    width: 14rem;

    border-right: 1px solid var(--grey-400);

    z-index: 20;
  }

  h1 {
    margin: 0;
  }

  .collapsed h1 {
    opacity: 0;
    margin-left: -10rem;
  }

  h1 {
    margin: 0;
  }

  .collapsed h1 {
    opacity: 0;
    margin-left: -10rem;
  }

  nav {
    display: grid;
    row-gap: 1rem;

    margin-top: 1rem;

    max-height: calc(100vh - 2 * var(--padding-top) - 4rem);

    overflow: scroll;
  }

  .sidebar_title {
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  .collapsed {
    width: 3rem;
    min-width: 3rem;

    --padding-top: 1.5rem;
    padding-inline: 1rem;
  }

  .hamburger_button,
  .collapse_button {
    display: grid;
    place-items: center;
  }

  .hamburger_button {
    display: none;
    position: fixed !important;
    top: 1.25rem;
    left: 1.25rem;
    height: 2rem;
    width: 2rem;
  }

  .collapse_button {
    height: 2.25rem;
    width: 2.25rem;
  }

  .collapsed .collapse_button {
    height: 2.5rem;
    width: 100%;
  }

  .link {
    padding: 0.5rem 1rem;
    text-align: start;

    border-radius: 1rem;

    color: var(--text-light);
    background: var(--grey-200);
  }

  .link:hover {
    background: var(--grey-50);
  }

  .collapsed .link {
    border-radius: 0.5rem;
    padding-block: 0.5rem;
    font-size: 14px;

    text-align: center;
  }

  @media (max-width: 600px) {
    .main {
      position: fixed;

      display: flex;
      flex-direction: column;

      gap: 1rem;

      top: 0;
      left: 0;

      height: 100vh;
      width: calc(100vw - 6rem);

      padding-inline: 3rem;
    }

    .collapsed {
      left: -100%;
    }

    .hamburger_button {
      display: block;
      left: unset;
      right: 3rem;
    }

    .collapsed .hamburger_button {
      left: 1.25rem;
      right: unset;
    }

    .collapse_button {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    .main {
      background: var(--grey-950);
      border-right-color: var(--grey-800);
    }

    .link {
      color: var(--text-dark);
      background: var(--grey-900);
    }

    .link:hover {
      background: var(--grey-800);
    }
  }
</style>
