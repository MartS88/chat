<script lang="ts">
  import {page} from '$app/stores';

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import ButtonLink from '$lib/components/ui/buttonlink/ButtonLink.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Popup from '$lib/components/popup/auth/Popup.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Store
  import {closeAuthModal} from '../../../../store/store';

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';

  // Service
  import AuthService from '$lib/services/AuthService';

  // Functions
  export let setMode: (value: string) => void;

  // Variables
  let formFilled;
  let loading = false;

  let popupError = false;
  let popupType = '';
  let popupMsg = '';

  let email: string = '';
  let emailError: string | null = 'Email is required*';
  let emailDirty: boolean = false;

  let password: string = '';
  let passwordError: string | null = 'Password is required*';
  let passwordDirty: boolean = false;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string | null = 'Confirm password*';
  let passwordVerifyDirty: boolean = false;


  function validateEmail(event: Event) {
    if (!event) {
      return;
    }
    email = event.detail;
    if (email.length === 0) {
      emailDirty = true;
      emailError = 'Email is required*';
    } else {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(email).toLowerCase())) {

        emailDirty = true;
        emailError = 'Enter a valid email*';
      } else {
        emailDirty = false;
        emailError = null;
      }
    }
  }

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

  function passwordVerify(event: Event) {
    if (!event) {
      return;
    }
    passwordVerifyValue = event.detail;
    if (passwordVerifyValue.length === 0) {
      passwordVerifyDirty = true;
      passwordVerifyError = 'Password is required*';
    } else if (passwordVerifyValue !== password) {
      passwordVerifyDirty = true;
      passwordVerifyError = 'Passwords do not match*';
    } else if (passwordVerifyValue === password) {
      passwordVerifyDirty = false;
      passwordVerifyError = null;
    }
  }

  function closePopup() {
    popupError = false;
  }

  async function handleSignup() {
    popupMsg = '';
    popupError = false;
    loading = true;
    try {
      const response = await AuthService.login(email, password);
      setTimeout(() => {
        loading = false;
        closeAuthModal();
        return response;
      }, 1500);
    } catch (error) {
      console.log('error login', error);
      setTimeout(() => {
        popupType = 'client-error';
        popupMsg = error.response.data.message || 'Server error';
        popupError = true;
        loading = false;
      }, 1500);
    }
  }

  async function handleSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSignup();
    }
  }

  $: formFilled = !emailError && !passwordError && !passwordVerifyError;
  $: authPath = $page.url.pathname.startsWith('/auth');

</script>

<form class="flex flex-col items-center bg-gray-50 p-5 w-full max-w-md mx-auto rounded-lg shadow-lg"
      use:clickOutside on:outclick={closeAuthModal}
      on:keydown={handleSubmit}
>
  <div class="w-full h-10 z-10">
    {#if popupError}
      <div class="w-full" in:fly={{x: 200,  duration: 1000 }}>
        <Popup type={popupType} label={popupMsg} on:click={closePopup} />
      </div>
    {/if}
  </div>

  <div class="flex flex-col items-center mb-8">
    <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
      <Icon iconType="IoMdPersonAdd" iconColor="black" />
    </div>

    <h2 class="text-2xl font-bold mb-2">Email login</h2>
    <p class="text-gray-500">Continue to BlockVision</p>

  </div>

  <div class="flex flex-col items-center gap-3 w-full p-2 z-0">
    <div class="flex flex-col w-full items-start">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        themeName="primary"
        bind:value={email}
        on:input={(event) => validateEmail(event)}
      />
      {#if emailError && emailDirty}
        <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>{emailError}</p>
      {/if}
    </div>

    <div class="flex flex-col w-full items-start">
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

    <div class="w-full flex flex-col items-start">
      <div class="flex flex-col w-full items-start">
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
      <div class="">

        {#if authPath}
          <ButtonLink url="/auth/password-recovery">Forgot password?</ButtonLink>
        {:else}
          <ButtonLink on:click={() => setMode('password-recovery')}>Forgot password?</ButtonLink>
        {/if}

      </div>
    </div>


    <div class="flex w-full justify-between gap-5">
      <Button
        themeName="cancel"
        on:click={closeAuthModal}
      >
        Cancel
      </Button>

      <Button
        themeName="continue"
        disabled={!formFilled}
        loading={loading}
        on:click={handleSignup}
      >
        Continue
      </Button>
    </div>

    <div class="w-full flex items-center">
      <p class="text-center text-gray-500  mr-auto">
        Don't have an account yet?

        {#if authPath}
          <ButtonLink url="/auth/signup">Sign up</ButtonLink>
        {:else}
          <ButtonLink on:click={() => setMode('signup')}>Sign up</ButtonLink>
        {/if}

      </p>
      {#if authPath}
        <ButtonLink url="http://localhost:3000/">to Main Page</ButtonLink>
      {/if}
    </div>
  </div>

</form>

