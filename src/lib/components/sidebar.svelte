<script lang="ts">
  import { afterNavigate } from "$app/navigation";
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
  {#if !collapsed}
    <h2>Classes</h2>
  {/if}
  {#if classes.length == 0}
    <p>Loading classes...</p>
  {:else}
    <nav>
      {#each classes as c}
        <a href={`/classes/${encodeURI(c.info?.name ?? "")}`}>
          {collapsed ? c.info?.name.charAt(1) : c.info?.name}
        </a>
      {/each}
    </nav>
  {/if}

  <!-- Normal Icon -->
  <button
    class="collapse_button"
    title={collapsed ? "Open Sidebar" : "Collapse Sidebar"}
    onmousedown={() => (collapsed = !collapsed)}
  >
    <Icon
      icon={collapse_icon}
      height={collapsed ? "1.25rem" : "100%"}
      width="100%"
    />
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

<style>
  .main {
    --padding-top: 0.5rem;

    position: relative;
    background: var(--grey-300);
    color: white;

    flex: 0;

    padding: var(--padding-top) 1.25rem;

    height: calc(100vh - 2 * var(--padding-top));
    min-width: 14rem;
    width: 14rem;

    border-right: 1px solid var(--grey-400);
  }

  nav {
    display: grid;
    row-gap: 1rem;

    max-height: calc(100vh - 2 * var(--padding-top) - 4rem);

    overflow: scroll;
  }

  .collapsed {
    width: 3rem;
    min-width: 3rem;

    --padding-top: 4.5rem;
    padding-inline: 1rem;
  }

  button {
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

  button:hover {
    background: var(--grey-50);
  }

  .hamburger_button {
    display: none;
    position: fixed !important;
    top: 1.25rem;
    left: 1.25rem;
  }

  .collapse_button {
    position: absolute !important;
    top: 1.25rem;
    right: 1.25rem;
  }

  .collapsed .collapse_button {
    width: 2.5rem;
  }

  a {
    display: block;

    text-decoration: none;

    padding: 0.7rem 1rem 0.5rem 1rem;

    border-radius: 1rem;

    color: var(--text-light);
    background: var(--grey-200);
  }

  a:hover {
    background: var(--grey-50);
  }

  .collapsed a {
    border-radius: 0.5rem;
    padding: 0.5rem 0 0.3rem 0;
    font-size: 14px;

    text-align: center;
  }

  @media (max-width: 600px) {
    .main {
      position: fixed;
      top: 0;
      left: 0;

      height: 100vh;
      width: calc(100vw - 2.5rem);
    }

    .collapsed {
      left: -100%;
    }

    .hamburger_button {
      display: block;
      left: unset;
      right: 1.25rem;
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

    button {
      color: var(--text-dark);
      background: var(--grey-800);
    }

    button:hover {
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
