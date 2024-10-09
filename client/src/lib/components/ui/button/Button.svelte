<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Components
  import Loader from '$lib/components/ui/loader/Loader.svelte';

  //Type
  import type { ButtonTheme } from '$lib/types/button';

  // Props
  export let label = '';
  export let loading = false;
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let themeName: ButtonTheme = 'primary';

  // Variables
  const dispatch = createEventDispatcher();

  // Functions
  function onClick(event: MouseEvent) {
    console.log('click');
    if (!disabled && !loading) {
      dispatch('click', event);
    }
  }


</script>

  <button
    {...$$restProps}
    disabled={disabled || loading}
    class={`btn ${themeName} ${disabled ? 'disabled' : ''}`}
    type={type}
    on:click={onClick}
  >
    {#if loading}
     <Loader  logoWidth="25" logoHeight="25"/>
      {:else}
    <slot>
      {label}
    </slot>
      {/if}
  </button>


<style lang="scss">
  @import '$lib/style/components/button.scss';
</style>
