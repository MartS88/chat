<script lang="ts">
  import axios from 'axios';

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import Popup from '$lib/components/popup/auth/Popup.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Variables
  let loading: boolean = false;
  let popupError: boolean = false;
  let popupType: string = '';
  let popupMsg: string = '';
  let username: string = '';
  let usernameError: string | null = 'Username is required*';
  let usernameDirty: boolean = false;

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';
  import {UpdateService} from '$lib/services/UpdateService';

  // Functions
  export let handleModal: () => void;

  function validateUsername(event: Event) {
    if (!event) return;
    username = event.detail;

    usernameDirty = true;
    if (username.length === 0) {
      usernameError = 'Username is required*';
    } else if (username.length <= 3) {
      usernameError = 'Username must contain more than 3 characters*';
    } else {
      usernameError = null;
    }
  }

  function closePopup() {
    popupError = false;
  }

  async function changeUsername() {
    popupMsg = '';
    popupError = false;
    loading = true;
    try {
      const email = localStorage.getItem('email')
      const response = await UpdateService.updateUsername(email,username)
      setTimeout(() => {
        popupType = 'success'
        popupError = true
        popupMsg = 'Username updated'
      })
      setTimeout(() => {
        loading = false;
        handleModal()
        return response
      }, 1500);
    } catch (error) {
      console.log('username error', error);
      setTimeout(() => {
        popupType = 'client-error';
        popupMsg = error.response.data.message || 'Server error';
        popupError = true;
        loading = false;
      }, 1500);
    }
  }

  $: formFilled = !usernameError;

</script>

  <div class="w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center gap-3"
       use:clickOutside
       on:outclick={handleModal}
  >
    {#if popupError}
      <div class="w-full h-10 z-10" in:fly={{ x: 200, duration: 1000 }}>
        <Popup type={popupType} label={popupMsg} on:click={closePopup} />
      </div>
    {:else}
      <div class="h-10">
      </div>
    {/if}
    <div class="w-full flex justify-center items-center">
      <div class="bg-white shadow-lg p-6 w-auto flex justify-center">
        <Icon iconType="FaEdit" iconWidth="30" iconHeight="30" iconColor="gray" />
      </div>
    </div>
    <div class="w-full flex justify-center items-center">
      <h2 class="text-2xl font-prompt">Edit username</h2>
    </div>
    <div class="flex items-center justify-center">
      <hr class="border-t border-gray-300 w-full max-w-xl mx-auto" />
    </div>

    <div class="h-20">
      <label for="username" class="block mb-1 text-sm font-medium text-gray-700">username</label>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        themeName="primary"
        bind:value={username}
        on:input={validateUsername}
      />
      {#if usernameError && usernameDirty}
        <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>
          {usernameError}
        </p>
      {/if}
    </div>

    <div class="w-full flex justify-between gap-5">
      <Button
        themeName="cancel"
        on:click={handleModal}>
        Cancel
      </Button>
      <Button
        themeName="continue"
        loading={loading}
        disabled={!formFilled}
        on:click={changeUsername}
      >
        Continue
      </Button>
    </div>
  </div>

