<script lang="ts">
  //Components
  import Logo from '$lib/components/ui/logo/Logo.svelte';
  import Button from '../../ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
  import Marquee from '$lib/components/marquee/Marquee.svelte';

  // Icon
  import FaPowerOff from 'svelte-icons/fa/FaPowerOff.svelte';

  // Transitions
  import {fly, fade} from 'svelte/transition';

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

</script>


<header class="w-full bg-white border-b-1.5 border-custom-gray-transparent p-2">
  <div class="w-full flex items-center justify-between">
    <Logo logoWidth="45" logoHeight="45" />

    {#if !searchState}
      <Marquee />
    {/if}

    {#if searchState}
      <div class="w-[31.25rem]"
           in:fly={{x: 200,  duration: 1000 }}
      >
        <Input type="text" placeholder="Find your assets" themeName="search" on:click={toggleInput} />
      </div>
      <div class="cursor-pointer -translate-x-1">
        <div class="w-6 h-6 text-red-500"
             on:click={setSearch}
        >
          <FaPowerOff />
        </div>

      </div>
    {:else}
      <div class="mr-10">
        {#if accessToken}
          <div in:fade={{ duration: 100 }}>
            <Dropdown />
          </div>

        {:else}
          <Button type="button" label="Login" themeName="primary" on:click={buttonClick} />
        {/if}
      </div>
    {/if}
  </div>

</header>

