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
    max-height: 100vh;
    width: 100%;
    justify-content: center;

    overflow-x: scroll;
    overflow-y: scroll;
  }

  .page {
    margin: 0 2rem;

    max-width: 1024px;
    width: calc(100% - 4rem);
    min-width: 400px;
  }
</style>
