<script lang="ts">
  // Type
  import type { ToastType } from '$lib/types/toast';

  // Components
  import ErrorIcon from '$lib/components/toast/ErrorIcon.svelte';
  import SuccessIcon from '$lib/components/toast/SuccessIcon.svelte';

  // Props
  export let toast: ToastType;

  let IconComponent;

  $: {
    switch (toast['type']) {
      case 'error':
        IconComponent = ErrorIcon;
        break;
      case 'success':
        IconComponent = SuccessIcon;
        break;
      default:
        IconComponent = null;
        break;
    }
  }
</script>

{#if IconComponent}
  <div class="w-6 h-6">
    <svelte:component this={IconComponent} />
  </div>
{/if}
