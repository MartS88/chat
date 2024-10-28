<script lang="ts">
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';

  // Icons
  import GoSettings from 'svelte-icons/go/GoSettings.svelte';
  import FaPowerOff from 'svelte-icons/fa/FaPowerOff.svelte';
  import GoKebabHorizontal from 'svelte-icons/go/GoKebabHorizontal.svelte';

  // Components
  import Loader from '$lib/components/ui/loader/Loader.svelte';

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';

  // Service
  import AuthService from '$lib/services/AuthService';

  // Store
  import {emailStore, toggleSidebarState} from '../../../store/store';
  import {usernameStore} from '../../../store/store.js';

  // Variables
  let loading: boolean = false;
  let showDropdown: boolean = false;

  // Functions
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function handleDropdown(value: boolean) {
    showDropdown = value;
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
    try {
      setTimeout(() => {
        AuthService.logout();
        if (userareaPath) {
          goto('/home');

        }
      }, 1400);
      setTimeout(() => {
        loading = false;
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        loading = false;
      }, 1500);
    }
  }

  $: userareaPath = $page.url.pathname.startsWith('/user-are');

</script>

{#if loading}
  <Loader logoWidth="30" logoHeight="30" />
{:else}
  <div class="w-70 relative flex flex-col justify-center items-center cursor-pointer"
       use:clickOutside
       on:outclick={() => handleDropdown(false)}
       on:click="{toggleDropdown}">
    <div
      class="w-full p-1 flex items-center border-gray-200 rounded-full transition-colors duration-300 hover:bg-custom-gray-transparent hover:rounded-full">
      <div
        class="flex items-center justify-center bg-gray-100 rounded-full w-10 h-10 text-gray-700 font-bold mr-3 text-sm">
        {$usernameStore[0]}
      </div>
      <div class="flex flex-col pr-2">
        <div class="flex justify-between w-full h-5">
          <span class="font-bold text-sm">localhost</span>
          <div class="translate-y-0.5">
            <div class="w-6 h-6 color-gray">
              <GoKebabHorizontal />
            </div>


          </div>
        </div>

        <span class="text-md text-gray-600">{$emailStore}</span>
      </div>
    </div>
    <div
      class="w-full h-auto absolute mt-2  right-0 p-2 bg-white border border-custom-gray-transparent shadow-lg rounded-md  z-10 translate-y-24 {showDropdown ? 'block' : 'hidden'}">
      <div
        class="w-full h-full flex items-center border-b">
        <div
          class="flex items-center justify-center bg-gray-100 rounded-full w-10 h-6 text-gray-700 font-bold mr-3 text-sm">
          {$usernameStore[0]}
        </div>
        <div class="flex flex-col pr-2  mb-1">
          <span class="font-bold text-sm">{$emailStore}</span>
          <span class="text-md text-gray-600">{$emailStore}</span>
        </div>
      </div>

      <ul class="w-full list-none mt-1">
        <li class="w-full flex items-center hover:bg-gray-100 cursor-pointer gap-3 p-1">
          <div class="w-4 h-4 b text-gray-500">
            <GoSettings />
          </div>
          <button on:click={handleNavigate}>Settings</button>
        </li>

        <li class="w-full flex items-center hover:bg-red-500 cursor-pointer gap-3 p-1 hover:text-zinc-50"
            on:click={handleLogout}>
          <div class="w-4 h-4 b text-gray-500">
            <FaPowerOff />
          </div>
          <button>Log Out</button>
        </li>
      </ul>
    </div>
  </div>
{/if}