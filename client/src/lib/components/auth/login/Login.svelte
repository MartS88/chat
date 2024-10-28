<script lang="ts">
  import {page} from '$app/stores';
  import {z} from 'zod';

  // Icons
  import IoMdPersonAdd from 'svelte-icons/io/IoMdPersonAdd.svelte';

  // Components
  import Toaster from '$lib/components/toast/Toaster.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import ButtonLink from '$lib/components/ui/buttonlink/ButtonLink.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Store
  import {closeAuthModal} from '../../../../store/store';

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';
  import {useToast} from '$lib/components/toast/usetoast';

  // Service
  import AuthService from '$lib/services/AuthService';
  import {addToast, toasts} from '../../../../store/toast';
  import {onMount} from 'svelte';

  // Variables
  let formFilled;
  let loading = false;

  let email: string = '';
  let emailError: string = '';
  let emailDirty: boolean = true;

  let password: string = '';
  let passwordError: string = '';
  let passwordDirty: boolean = true;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string = '';
  let passwordVerifyDirty: boolean = true;

  let toastList = [];

  // Zod schema for validation
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
          addToast({
            type: 'error',
            id: `Login_${Date.now()}`,
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
      await handleSignup();
    }
  }

  const unsubscribe = toasts.subscribe((value) => {
    toastList = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });

  $: formFilled = !emailDirty && !passwordDirty && !passwordVerifyDirty;
  $: authPath = $page.url.pathname.startsWith('/auth');


</script>

<form class="w-full h-auto  flex flex-col justify-between items-center bg-gray-50 p-5  max-w-md mx-auto rounded-lg shadow-lg"
      use:clickOutside
      on:outclick={closeAuthModal}
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
        <IoMdPersonAdd />
      </div>

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
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{passwordVerifyError}</p>
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

