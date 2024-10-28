<script lang="ts">
  // Components
  import ToastIcon from '$lib/components/toast/ToastIcon.svelte';
  import ToastMessage from '$lib/components/toast/ToastMessage.svelte';

  // Type
  import type { Toast } from '$lib/types/toast';

  export let toast: Toast;

  // Variables
  let wrapperEl;

</script>

<div
  bind:this={wrapperEl}
  class:active={toast.visible}
  class:bg-green-500={toast.type === 'success'}
  class:bg-black={toast.type === 'error'}
  class="w-full h-auto popup flex-col items-center rounded-lg shadow-lg z-100 p-2"
>
  <div class="w-full flex items-center gap-4">
    <ToastIcon toast={toast}/>
    <div class="flex items-center justify-center">
      <ToastMessage message={toast.message}/>
    </div>
  </div>
</div>
