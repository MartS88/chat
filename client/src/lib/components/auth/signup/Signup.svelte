<script lang="ts">
  import {page} from '$app/stores';
  import {onMount} from 'svelte';
  import {z} from 'zod';

  // Icons
  import IoMdPersonAdd from 'svelte-icons/io/IoMdPersonAdd.svelte';
  // Components
  import Button from '$lib/components/ui/button/Button.svelte';
  import ButtonLink from '$lib/components/ui/buttonlink/ButtonLink.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Toaster from '$lib/components/toast/Toaster.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Store
  import {closeAuthModal} from '../../../../store/store';
  import {addToast, toasts} from '../../../../store/toast';

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';

  // Service
  import AuthService from '$lib/services/AuthService';

  // Variables
  let formFilled;
  let loading = false;

  let firstStep = true;
  let secondStep = false;

  let username: string = '';
  let usernameError: string = ''
  let usernameDirty: boolean = false;

  let email: string = '';
  let emailError: string = ''
  let emailDirty: boolean = false;

  let password: string = '';
  let passwordError: string = ''
  let passwordDirty: boolean = false;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string = ''
  let passwordVerifyDirty: boolean = false;

  let toastList = []

  // Zod schema for validation
  const usernameSchema = z.string()
    .min(4, 'Username must contain more than 3 characters*')
    .nonempty('Username is required*');

  const emailSchema = z.string()
    .nonempty('Email is required*')
    .trim()
    .toLowerCase()
    .regex(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      {message: 'Enter a valid email'}
    );

  const passwordSchema = z.string()
    .min(5, 'Password must contain more than 5 characters*')
    .nonempty('Password is required*');

  const passwordVerifySchema = z.object({
    password: z.string()
      .min(5, 'New password must be longer than 5 characters*')
      .nonempty('New password is required*'),
    passwordVerifyValue: z.string()
      .min(5, 'New password must be longer than 5 characters*')
      .nonempty('Confirm password is required*')
  }).refine((data) => {
    return data.password === data.passwordVerifyValue;
  }, {
    message: 'Passwords do not match*',
    path: ['passwordVerifyValue']
  });

  // Functions
  export let setMode: (value: string) => void;

  function validateUsername(event: Event) {
    if (!event) return;
    username = event.detail;

    const result = usernameSchema.safeParse(username);
    if (!result.success) {
      usernameError = result.error.errors[0].message;
      usernameDirty = true
    } else {
      usernameError = ''
      usernameDirty = false
    }
  }

  function validateEmail(event: Event) {
    if (!event) {
      return;
    }
    email = event.detail;
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      emailError = result.error.errors[0].message;
      emailDirty = true;
    } else {
      emailError = '';
      emailDirty = false;
    }
  }

  function passwordValidate(event: Event) {
    if (!event) {
      return;
    }
    password = event.detail;
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      passwordError = result.error.errors[0].message;
      passwordDirty = true;
    } else {
      passwordError = ''
      passwordDirty = false;
    }
  }

  function passwordVerify(event: Event) {
    if (!event) {
      return;
    }
    passwordVerifyValue = event.detail;
    const result = passwordVerifySchema.safeParse({
      password,
      passwordVerifyValue,
    });
    if (!result.success) {
      passwordVerifyError = result.error.errors[0].message;
      passwordVerifyDirty = true;
    } else {
      passwordVerifyError = '';
      passwordVerifyDirty = false;
    }
  }

  async function handleSignup() {
    if (!formFilled) return;

    loading = true;
    try {
      const response = await AuthService.registration(username, email, password);
      setTimeout(() => {
        firstStep = false;
        secondStep = true;
        loading = false;
        return response;
      }, 1500);
    } catch (error) {
      console.log('error',error);
      setTimeout(() => {
        addToast({
          type: 'error',
          id: `Signup_${Date.now()}`,
          visible: true,
          message: error.response.data.message,
          duration: 1500
        });
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
  const unsubscribe = toasts.subscribe(value => {
    toastList = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });

  $: formFilled = !usernameError && !emailError && !passwordError && !passwordVerifyError;
  $: authPath = $page.url.pathname.startsWith('/auth');


</script>
{#if firstStep}
  <form class="flex flex-col items-center bg-gray-50 p-5 w-full max-w-md mx-auto rounded-lg shadow-lg"
        use:clickOutside on:outclick={closeAuthModal}
        on:keydown={handleSubmit}
  >
    {#if toastList.length > 0}
      <div class="w-full h-10 z-10"
           in:fly={{ x: 200, duration: 1000 }}
      >
        <Toaster toasts={toastList} />
      </div>
    {:else}
      <div class="w-full h-10 z-10"></div>
    {/if}

    <div class="flex flex-col items-center mb-4">
      <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <div class="w-8 h-8 text-black">
          <IoMdPersonAdd/>
        </div>

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
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{usernameError}</p>
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
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{emailError}</p>
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
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{passwordError}</p>
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
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{passwordVerifyError}</p>
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

      <div class="w-full flex items-center">
        <p class="text-center text-gray-500 mr-auto">
          Already have an account?

          {#if authPath}
            <ButtonLink url="/auth/login">Log in</ButtonLink>
          {:else}
            <ButtonLink on:click={() => setMode('login')}>Log in</ButtonLink>
          {/if}
        </p>

        {#if authPath}
          <ButtonLink url="http://localhost:3000/">to Main Page</ButtonLink>
        {/if}
      </div>

    </div>
  </form>
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
