<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Service
  import AuthService from '$lib/services/AuthService';
  import Loader from '$lib/components/ui/loader/Loader.svelte';
  import {emailStore,  toggleSidebarState} from '../../../store/store';
  import {goto} from '$app/navigation';

  // Variables
  let loading: boolean = false;
  let showDropdown: boolean = false;

  // Functions
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function handleNavigate() {
    toggleSidebarState(true);
    setTimeout(() => {
      toggleSidebarState(false);
    }, 1300);
    setTimeout(() => {
      goto('user-area');
    }, 1000);
  }

  async function handleLogout() {
    loading = true;
    setTimeout(() => {
      AuthService.logout();
    }, 1400);
    setTimeout(() => {
      loading = false;
    }, 1500);
  }

  let username = 'dexter';
  $: email = $emailStore;

  console.log('email',email);

</script>

{#if loading}
  <Loader logoWidth="30" logoHeight="30" />
{:else}
  <div class="w-70 relative flex flex-col justify-center items-center cursor-pointer" on:click="{toggleDropdown}">
    <div
      class="w-full p-1 flex items-center border-gray-200 rounded-full transition-colors duration-300 hover:bg-custom-gray-transparent hover:rounded-full">
      <div
        class="flex items-center justify-center bg-gray-100 rounded-full w-10 h-10 text-gray-700 font-bold mr-3 text-sm">
        {username.charAt(0)}
      </div>
      <div class="flex flex-col pr-2">
        <div class="flex justify-between w-full h-5">
          <span class="font-bold text-sm">localhost</span>
          <div class="translate-y-0.5">
            <Icon iconType="GoKebabHorizontal" iconWidth="20" iconHeight="20" iconColor="gray" class="ml-2" />
          </div>
        </div>

        <span class="text-md text-gray-600">{email}</span>
      </div>
    </div>
    <div
      class="w-full h-auto absolute mt-2  right-0 p-2 bg-white border border-custom-gray-transparent shadow-lg rounded-md  z-10 translate-y-24 {showDropdown ? 'block' : 'hidden'}">
      <div
        class="w-full h-full flex items-center border-b">
        <div
          class="flex items-center justify-center bg-gray-100 rounded-full w-10 h-6 text-gray-700 font-bold mr-3 text-sm">
          {username.charAt(0)}
        </div>
        <div class="flex flex-col pr-2  mb-1">
          <span class="font-bold text-sm">{email}</span>
          <span class="text-md text-gray-600">{email}</span>
        </div>
      </div>

      <ul class="w-full list-none mt-1">
        <li class="w-full flex items-center hover:bg-gray-100 cursor-pointer gap-3 p-1">
          <Icon iconType="GoSettings" iconWidth="20" iconHeight="20" iconColor="gray" />
          <a on:click={handleNavigate}>Settings</a>
        </li>

        <li class="w-full flex items-center hover:bg-red-500 cursor-pointer gap-3 p-1 hover:text-zinc-50"
            on:click={handleLogout}>
          <Icon iconType="FaPowerOff" iconWidth="20" iconHeight="20" iconColor="gray" />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  </div>
{/if}