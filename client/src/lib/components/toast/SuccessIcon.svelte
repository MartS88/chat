<script lang="ts">
  // Icon
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';

  // Type
  import type { ToastType } from '$lib/types/toast';

  export let type: ToastType = 'success';
</script>

{#if type === 'success'}

  <div class="w-6 h-6 text-white">
    <FaCheckCircle />
  </div>
{/if}



