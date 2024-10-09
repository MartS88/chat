<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Popup from '$lib/components/popup/signup_login/Popup.svelte';

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
  let typeError = '';
  let errorMsg = '';
  let firstStep = true;
  let secondStep = false;

  let username: string = '';
  let usernameError: string | null = 'Username is required*';
  let usernameDirty: boolean = false;

  let email: string = '';
  let emailError: string | null = 'Email is required*';
  let emailDirty: boolean = false;

  let password: string = '';
  let passwordError: string | null = 'Password is required*';
  let passwordDirty: boolean = false;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string | null = 'Confirm password*';
  let passwordVerifyDirty: boolean = false;

  // Functions
  function validateUsername(event: Event) {
    if (!event) return;
    username = event.detail;
    if (username.length === 0) {
      usernameDirty = true;
      usernameError = '';
    }
    if (username.length <= 3) {
      usernameDirty = true;
      usernameError = 'Username must contain more than 3 characters*';
    } else {
      usernameDirty = false;
      usernameError = null;
    }
  }

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

  function onBlur(event: FocusEvent) {
    console.log('ONBLUR EVENT', event);
    const target = event.detail as HTMLInputElement;
    switch (target.srcElement.name) {
      case 'email':
        emailDirty = true;
        break;
      case 'password':
        passwordDirty = true;
        break;
      case 'passwordVerify':
        passwordVerifyDirty = true;
        break;
    }
  }

  function closePopup() {
    popupError = false;
  }

  async function handleSignup() {
    if (!formFilled) return;
    popupError = false
    loading = true;
    try {
      const response = await AuthService.registration(username, email, password);
      setTimeout(() => {
        firstStep = false;
        secondStep = true;
        loading = false;
        console.log('response REG', response);
        return response;
      }, 1500);
    } catch (error) {
      console.log('error singup', error.response.status);
      console.log('error.message', error.response.data.message);

      setTimeout(() => {
        typeError = 'client-error';
        errorMsg = error.response.data.message || 'Server error';
        popupError = true;
        loading = false;
      }, 1500);

    }
  }

  async function handleSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('event', event);
      await handleSignup();
    }
  }

  $: formFilled = !usernameError && !emailError && !passwordError && !passwordVerifyError;

</script>
{#if firstStep}
  <section class="flex flex-col items-center bg-gray-50 p-5 w-full max-w-md mx-auto rounded-lg shadow-lg"
           use:clickOutside on:outclick={closeAuthModal}
           on:keydown={handleSubmit}
  >
    <div class="w-full h-10 z-10">
      {#if popupError}
        <div class="w-full" in:fly={{x: 200,  duration: 1000 }}>
          <Popup type={typeError} label={errorMsg} on:click={closePopup} />
        </div>
      {/if}
    </div>

    <div class="flex flex-col items-center mb-8">
      <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <Icon iconType="IoMdPersonAdd" iconColor="black" />
      </div>
      <h2 class="text-2xl font-bold mb-2">Email sign up</h2>
      <p class="text-gray-500">Continue to BlockVision</p>
    </div>

    <div class="flex flex-col items-center gap-3 w-full p-2 z-0">
      <div class="flex flex-col w-full items-start">
        <Input
          type="email"
          name="userName"
          placeholder=Username
          themeName="primary"
          bind:value={username}
          on:input={(event) => validateUsername(event)}

        />
        {#if usernameError && usernameDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>{usernameError}</p>
        {/if}
      </div>

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

      <p class="text-center text-gray-500 mr-auto">
        Already have an account?
        <Button
          themeName="link"
          on:click={() => setMode('login')}
        >Log in
        </Button>
      </p>
    </div>
  </section>
{:else}
  <section class="flex flex-col items-center bg-gray-50 p-5 w-full max-w-md mx-auto rounded-lg shadow-lg"
           use:clickOutside on:outclick={closeAuthModal}
  >
    <div class="flex flex-col items-center mb-8">
      <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <Icon iconType="IoMdPersonAdd" iconColor="black" />
      </div>
      <h2 class="text-2xl font-bold mb-2">Email sign up</h2>
      <p class="text-gray-500">Continue to BlockVision</p>
    </div>
    <div class="flex flex-col items-center gap-3 w-full p-2">
      <div class="flex flex-col w-full items-start">
        <p class="text-gray-700 text-sm leading-relaxed font-medium mb-4 text-center">
          We have sent an activation link to {email}. Please check your inbox (and your spam or
          junk folder) to find the link. Follow the instructions in the email to complete your account activation.
          The link will expire in 24 hours, so please make sure to activate your account as soon as possible.
          If you did not receive the email, you can request a new activation link.
        </p>
      </div>
      <div
        class="w-full h-full flex justify-center items-center">

        <Button
          themeName="resend"
        >
          Send activation link
        </Button>

      </div>

  </section>
{/if}
