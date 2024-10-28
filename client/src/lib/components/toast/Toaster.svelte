<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  // Components
  import ToastWrapper from './ToastWrapper.svelte';

  // Type
  import type {Toast} from '$lib/types/toast';

  // Props
  export let containerStyle: string | undefined = undefined;
  export let containerClassName: string | undefined = undefined;
  export let toasts: Toast[] = [];

  const dispatch = createEventDispatcher();

  function onClick(event: MouseEvent) {
    dispatch('click', event);
  }

</script>

<div
  class="toaster {containerClassName || ''}"
  style={containerStyle}
  on:click={onClick}
>
  {#each toasts as toast (toast.id)}
    <div class="toast-wrapper">
      <ToastWrapper {toast} />
    </div>
  {/each}
</div>

