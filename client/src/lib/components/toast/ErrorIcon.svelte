<script lang="ts">
  // Icon
  import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';

  // Type
  import type { ToastType } from '$lib/types/toast';


  export let type: ToastType = 'error';

</script>

{#if type === 'error'}
  <div class="w-6 h-6 text-red-500">
    <IoIosCloseCircle />
  </div>
{/if}
