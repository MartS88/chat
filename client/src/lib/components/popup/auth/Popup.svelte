<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  // Icon
  import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'

  // Components
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

{#if type === 'client-error' || type === 'server-error'}
  <div
    class="w-full h-full popup flex items-center bg-black text-white px-5 py-2 gap-2 rounded-lg shadow-lg z-100"
    type={type}
  >
    <div class="flex items-center justify-center text-white rounded-full w-5 h-5 mr-2 cursor-pointer">
      <div class="w-6 h-6 b text-red-500" on:click={onClick}>
        <IoIosCloseCircle />
      </div>

    </div>
    <span class="text-center">{label}</span>
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

{#if type === 'success'}
  <div
    class="w-full h-full popup flex items-center bg-green-500 text-white px-10 py-2 rounded-lg shadow-lg z-100"
    type={type}
  >
    <div class="flex items-center justify-center rounded-full w-5 h-5 mr-2 cursor-pointer">
      <div class="w-6 h-6 b text-white" on:click={onClick}>
        <FaCheckCircle />
      </div>
    </div>
    <span class="text-center font-semibold">{label || 'Operation successful!'}</span>
  </div>
{/if}
