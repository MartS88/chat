<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  // Types
  import type {PopupType} from '$lib/types/popup';

  // Props
  export let popupType: PopupType;
  export let label: string = '';

  const dispatch = createEventDispatcher();

  function onClick(event: MouseEvent) {
    dispatch('click', event);
  }

</script>

<div popupType={popupType} label={label} on:click={onClick}>

  <slot  />
</div>

