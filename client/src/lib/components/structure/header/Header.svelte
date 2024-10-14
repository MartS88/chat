<script lang="ts">

  //Components
  import Logo from '$lib/components/ui/logo/Logo.svelte';
  import Button from '../../ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
  import Marquee from '$lib/components/marquee/Marquee.svelte';

  // Transitions
  import {fly} from 'svelte/transition';

  // Store
  import {searchInputState, authModalState, toggleInput, accessTokenStore} from '../../../../store/store';

  $: searchState = $searchInputState;
  $: authModal = $authModalState;

  function setSearch() {
    searchInputState.update(value => !value);
  }

  function buttonClick() {
    authModalState.update(value => !value);
  }


  let accessToken;
  $: accessToken = $accessTokenStore;
  console.log('accessToken',{$:accessToken});
</script>


<header class="w-full bg-white border-b-1.5 border-custom-gray-transparent p-2">
  <div class="w-full flex items-center justify-between">
    <Logo logoWidth="45" logoHeight="45" />

    {#if !searchState}
      <Marquee />
    {/if}

    {#if searchState}
      <div class="w-[31.25rem]" in:fly={{x: 200,  duration: 1000 }}>
        <Input type="text" placeholder="Find your assets" themeName="search" on:click={toggleInput} />
      </div>
      <div class="cursor-pointer -translate-x-1">
        <Icon iconType='FaPowerOff' iconWidth={20} iconHeight={20} iconColor="#fc6f7f" on:click={setSearch} />
      </div>
    {:else}
      <div class="mr-10">
      {#if accessToken}
        <Dropdown/>
        {:else}
      <Button type="button" label="Login" themeName="primary" on:click={buttonClick} />
        {/if}
      </div>
      {/if}
  </div>

</header>

