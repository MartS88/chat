<script lang="ts">
  // Type
  import type {Toast} from '$lib/types/toast';

  export let message: Toast['message'];

</script>

<div class="flex justify-center items-center font-prompt text-white text-center">
  {#if message}
    {message}
  {/if}
</div>

