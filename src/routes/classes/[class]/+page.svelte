<script lang="ts">
  import { page } from "$app/state";

  let class_title = $derived(page.params.class);
</script>

<h1>{class_title}</h1>
<p>This is a class page, good job!</p>
