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
    display: grid;
    width: 100%;
    justify-content: center;

    overflow-x: scroll;
  }

  .page {
    width: calc(100% - 4rem);
    margin: 0 2rem;
    max-width: 1024px;
    min-width: 400px;
  }
</style>
