<script lang="ts">
  let { children } = $props();
</script>

<div class="layout">
  <div class="page">
    {@render children()}
  </div>
</div>

<style>
  .layout {
    display: flex;

    max-height: 100vh;
    max-width: 1024px;
    min-width: 400px;
    width: 100%;

    margin-inline: auto;

    overflow-y: scroll;
  }

  .page {
    padding-top: 0.3rem;
    padding-inline: 2rem;

    flex-grow: 1;
  }
</style>
