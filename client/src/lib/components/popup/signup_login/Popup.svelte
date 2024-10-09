<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import NotConnected from '$lib/components/notconnected/NotConnected.svelte';

  // Props
  export let type: 'primary' | 'update' | 'success' | 'client-error' | 'server-error' | 'connection' = 'primary';
  export let label: string = '';

  // Variables
  const dispatch = createEventDispatcher();

  // Functions
  function onClick(event: MouseEvent) {
    dispatch('click', event);
  }

</script>

{#if type === 'client-error' || 'server-error'}
  <div
    class="w-full h-full popup flex items-center bg-black text-white px-10 py-2 rounded-lg shadow-lg z-100"
    type={type}
  >
    <div class="flex items-center justify-center text-white rounded-full w-5 h-5 mr-2">
      <Icon iconType="IoIosCloseCircle" iconColor="red" on:click={onClick} />
    </div>
    <span>{label || 'Invalid email or password'}</span>
  </div>
{/if}

{#if type === 'connection'}
  <div
    class="w-full h-full popup flex items-center bg-black text-white px-10 py-2 rounded-lg shadow-lg z-100"
    type={type}
  >
    <NotConnected onClick={onClick} />
  </div>
{/if}
