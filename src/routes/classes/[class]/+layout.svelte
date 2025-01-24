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
  }

  .page {
    width: 1024px;
  }
</style>
