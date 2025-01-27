<script lang="ts">
  import { classes_store } from "$lib/classes_store";
  import Tutorial from "$lib/components/tutorial.svelte";
</script>

<div>
  <h1>CleanBoard</h1>
  <h2 class="slogan">BlackBoard without all the chalk</h2>
  {#if $classes_store.length != 0}
    <Tutorial />
  {/if}
</div>

<style>
  div {
    padding: 3rem 0 0 5rem;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
  }

  .slogan {
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    div {
      padding: 1rem;
    }
  }
</style>
