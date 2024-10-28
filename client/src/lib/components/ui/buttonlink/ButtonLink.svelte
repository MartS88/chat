<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  // Type
  import type {ButtonTheme} from '$lib/types/button';

  // Props
  export let themeName: ButtonTheme = 'link';
  export let url: string;
  export let loading = false;
  export let small = false;
  export let target: '_self' | '_blank' | '_parent' | '_top' | undefined = undefined;
  export let fullWidth = false;


  // Variables
  const dispatch = createEventDispatcher();

  // Functions
  function onClick(event: MouseEvent) {
    if (!loading){
      dispatch('click', event);
    }
  }


</script>

<a
  class:btn-small={small}
  class:btn-w-full={fullWidth}
  class:btn-loader={loading}
  class="{themeName} {$$props.class || ''}"
  {target}
  href={url}
  on:click={onClick}
>
  <slot />
</a>

<style lang="scss">
  @import '$lib/style/components/button';
</style>
