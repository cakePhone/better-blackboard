<script lang="ts">
  import { classes_store, current_class_store } from "$lib/classes_store";
  import Tutorial from "$lib/components/tutorial.svelte";
  import ClassPage from "$lib/pages/classPage.svelte";
</script>

<div>
  {#if $current_class_store == ""}
    <h1>CleanBoard</h1>
    <h2 class="slogan">BlackBoard without all the chalk</h2>
    {#if $classes_store.length != 0}
      <Tutorial />
    {/if}
  {:else}
    <ClassPage render_class={$current_class_store} />
  {/if}
</div>

<style>
  div {
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
  }

  h1 {
    font-size: 3rem;
  }

  .slogan {
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    div {
      padding-inline: 1rem;
    }
  }
</style>
