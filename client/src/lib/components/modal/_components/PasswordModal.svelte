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
  let email:string | undefined = localStorage.getItem('email')
  let popupError: boolean = false;
  let popupType: string = '';
  let popupMsg: string = '';

  let password: string = '';
  let passwordError: string | null = 'Password is required*';
  let passwordDirty: boolean = false;

  let newpassword: string = '';
  let newpasswordError: string | null = 'New password is required*';
  let newpasswordDirty: boolean = false;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string | null = 'Confirm password*';
  let passwordVerifyDirty: boolean = false;

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';


  // Functions
  export let handleModal: () => void;

  function passwordValidate(event: Event) {
    if (!event) {
      return;
    }
    password = event.detail;
    if (password.length === 0) {
      passwordDirty = true;
      passwordError = 'Password is required*';

    } else if (password.length <= 5) {
      passwordDirty = true;
      passwordError = 'Password must be longer than 5 symbols*';
    } else {
      passwordDirty = false;
      passwordError = null;
    }
  }

  function newpasswordVerify(event:Event){
    if (!event) {
      return;
    }
    newpassword = event.detail;
    if (newpassword.length === 0) {
      newpasswordDirty = true;
      newpasswordError = 'New password is required*';

    } else if (newpassword.length <= 5) {
      newpasswordDirty = true;
      newpasswordError = 'New password must be longer than 5 symbols*';
    } else {
      newpasswordDirty = false;
      newpasswordError = null;
    }
  }

  function passwordVerify(event: Event) {
    if (!event) {
      return;
    }
    passwordVerifyValue = event.detail;
    if (passwordVerifyValue.length === 0) {
      passwordVerifyDirty = true;
      passwordVerifyError = 'Password is required*';
    } else if (passwordVerifyValue !== newpassword) {
      passwordVerifyDirty = true;
      passwordVerifyError = 'Passwords do not match*';
    } else if (passwordVerifyValue === newpassword) {
      passwordVerifyDirty = false;
      passwordVerifyError = null;
    }
  }

  function closePopup() {
    popupError = false;
  }

  async function changePassword() {
    popupMsg = '';
    popupError = false;
    loading = true;
    try {
      const body = {

      };
      const response = await axios.post('http:/localhost:5000/user/change-username', body);
      setTimeout(() => {
        loading = false;
        console.log('response changeusername', response);
        return response;
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

  $: formFilled = !passwordError && !newpasswordError && !passwordVerifyError

</script>

<div use:clickOutside on:outclick={handleModal}>
  {#if popupError}
    <div class="w-full" in:fly={{ x: 200, duration: 1000 }}>
      <Popup type={popupType} label={popupMsg} on:click={closePopup} />
    </div>
  {/if}
  <div class="w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center gap-3">

    <div class="w-full flex justify-center items-center">
      <h2 class="mr-auto text-2xl font-prompt">Password reset</h2>
    </div>

    <div class="bg-blue-100 border border-blue-200 rounded-md p-1 text-gray-700">
      <p class="ml-1 font-prompt">Your current email:</p>
      <p class="ml-1 text-sm font-medium">{email}</p>
    </div>

    <div>

      <div class="flex flex-col w-full items-start mb-3">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          themeName="primary"
          bind:value={password}
          on:input={(event) => passwordValidate(event)}
        />
        {#if passwordError && passwordDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>{passwordError}</p>
        {/if}
      </div>
      <div class="flex flex-col w-full items-start mb-3">
        <Input
          type="password"
          name="newpassword"
          placeholder="New password"
          themeName="primary"
          bind:value={newpassword}
          on:input={(event) => newpasswordVerify(event)}
        />
        {#if newpasswordError && newpasswordDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>{newpasswordError}</p>
        {/if}
      </div>
      <div class="flex flex-col w-full items-start mb-1">
        <Input
          type="password"
          name="passwordVerify"
          placeholder="Confirm password"
          themeName="primary"
          bind:value={passwordVerifyValue}
          on:input={(event) => passwordVerify(event)}

        />
        {#if passwordVerifyError && passwordVerifyDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}>{passwordVerifyError}</p>
        {/if}
      </div>
    </div>

    <div class="w-full flex justify-between gap-5">
      <Button
        themeName="cancel"
        on:click={handleModal}>
        Cancel
      </Button>
      <Button
        themeName="continue"
        disabled={!formFilled}

      >
        Continue
      </Button>
    </div>
  </div>
</div>
