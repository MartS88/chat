<script lang="ts">

  import {createEventDispatcher} from 'svelte';

  type SvelteInputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Type
  import type {InputTheme} from '$lib/types/input';

  // Icon
  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';

  // Store
  import {inputActive} from '../../../../store/store';

  // Props
  export let type: 'text' | 'number' | 'password' | 'email' | 'range' = 'text';
  export let placeholder: string = '';
  export let themeName: InputTheme = 'primary';
  export let name:string = ''

  // Variables
  let active: boolean = false;
  const dispatch = createEventDispatcher();

  // Functions
  function handleInput(event: SvelteInputEvent) {
    const inputValue = event.currentTarget.value;
    dispatch('input', inputValue);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }

  function handleClick(event: MouseEvent) {
    dispatch('click', event);
  }

  $: {
    inputActive.subscribe(value => {
      active = value;
    });
  }

</script>
{#if themeName === 'search'}
  <div class="search_input_wrapper" class:active={active}>
    <div class="left_block">
      <Icon iconType={'FaSearch'} iconWidth={15} iconHeight={15} iconColor="gray" />
    </div>
    <div class="right_block">
      <input
        {...$$restProps}
        type={type}
        name={name}
        placeholder={placeholder}
        class={themeName}
        on:input={handleInput}
        on:blur={handleBlur}
        on:click={handleClick}
      />
    </div>
  </div>
{:else if themeName === 'primary'}
  <input
    {...$$restProps}
    type={type}
    name={name}
    placeholder={placeholder}
    class={themeName}
    on:input={handleInput}
    on:blur={handleBlur}
    on:click={handleClick}
  />
{:else if themeName === 'verification'}
  <input
    {...$$restProps}
    type={type}
    name={name}
    placeholder={placeholder}
    class={themeName}
    on:input={handleInput}
    on:blur={handleBlur}
    on:click={handleClick}
  />
{/if}

<style>
    @import '$lib/style/components/input.scss';
</style>

