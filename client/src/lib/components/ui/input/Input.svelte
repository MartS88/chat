<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  type SvelteInputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Type
  import type {InputTheme} from '$lib/types/input';

  // Store
  import {inputActive} from '../../../../store/store';

  // Props
  export let type: 'text' | 'number' | 'password' | 'email' | 'range' = 'text';
  export let placeholder: string = '';
  export let themeName: InputTheme = 'primary';
  export let name: string = '';
  export let autocomplete: string = '';
  export let readonly: boolean = false;
  export let disabled: boolean = false;
  export let maxLength: number | null = null;
  export let minLength: number | null = null;

  // Variables
  let input: HTMLInputElement;
  let active: boolean = false;

  const dispatch = createEventDispatcher();

  // Functions
  function handleInput(event: SvelteInputEvent) {
    let inputValue = event.currentTarget.value;

    if (type === 'number') {

      inputValue = inputValue.replace(/[^0-9]/g, '');

      if (maxLength !== null) {
        inputValue = inputValue.slice(0, maxLength);
      }

      event.currentTarget.value = inputValue;
    }

    dispatch('input', inputValue);
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', event);
  }

  function handleClick(event: MouseEvent) {
    dispatch('click', event);
  }


  export function focus() {
    if (input) {
      input.focus();
    } else {
      console.error('Input element not found');
    }
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
        autocomplete={autocomplete}
        readonly={readonly}
        disabled={disabled}
        minlength={minLength !== null ? minLength : undefined}
        maxlength={maxLength !== null ? maxLength : undefined}
        bind:this={input}
        on:input={handleInput}
        on:blur={handleBlur}
        on:click={handleClick}
      />
    </div>
  </div>
{:else}
  <input
    {...$$restProps}
    type={type}
    name={name}
    placeholder={placeholder}
    class={themeName}
    autocomplete={autocomplete}
    readonly={readonly}
    disabled={disabled}
    minlength={minLength !== null ? minLength : undefined}
    maxlength={maxLength !== null ? maxLength : undefined}
    bind:this={input}
    on:input={handleInput}
    on:blur={handleBlur}
    on:click={handleClick}
  />
{/if}

<style>
    @import '$lib/style/components/input.scss';
</style>
