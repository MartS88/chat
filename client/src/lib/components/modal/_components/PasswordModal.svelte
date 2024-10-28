<script lang="ts">
  import {z} from 'zod';
  import {onMount} from 'svelte';

  // Components
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Store
  import {toasts} from '../../../../store/toast';

  // Variables
  let loading: boolean = false;
  let email: string | undefined = localStorage.getItem('email');
  let passwordInput;

  let password: string = '';
  let passwordError: string = '';
  let passwordDirty: boolean = true;

  let newpassword: string = '';
  let newpasswordError: string = '';
  let newpasswordDirty: boolean = true;

  let passwordVerifyValue: string = '';
  let passwordVerifyError: string = '';
  let passwordVerifyDirty: boolean = true;

  let toastList = [];

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';
  import {useToast} from '$lib/components/toast/usetoast';


  // Service
  import {UpdateService} from '$lib/services/UpdateService';
  import Toaster from '$lib/components/toast/Toaster.svelte';

  // Zod schema for validation
  const passwordSchema = z.string()
    .min(5, 'Password must contain more than 5 characters*')
    .nonempty('Password is required*');

  const newpasswordSchema = z.string()
    .min(5, 'New password must be longer than 5 symbols*')
    .nonempty('New password is required*');

  const passwordVerifySchema = z.object({
    newpassword: z.string()
      .min(5, 'New password must be longer than 5 characters*')
      .nonempty('New password is required*'),
    passwordVerifyValue: z.string()
      .min(5, 'New password must be longer than 5 characters*')
      .nonempty('Confirm password is required*')
  }).refine((data) => data.newpassword === data.passwordVerifyValue, {
    message: 'Passwords do not match*',
    path: ['passwordVerify']
  });


  // Functions
  export let handleModal: () => void;

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
      passwordDirty = false;
    }
  }

  function newpasswordVerify(event: Event) {
    if (!event) {
      return;
    }
    newpassword = event.detail;
    const result = newpasswordSchema.safeParse(newpassword);
    if (!result.success) {
      newpasswordError = result.error.errors[0].message;
      newpasswordDirty = true;
    } else {
      newpasswordError = ''
      newpasswordDirty = false;
    }
  }

  function passwordVerify(event: Event) {

    if (!event) {
      return;
    }
    passwordVerifyValue = event.detail;
    const result = passwordVerifySchema.safeParse({
      newpassword: newpassword,
      passwordVerifyValue: passwordVerifyValue
    });
    if (!result.success) {
      passwordVerifyError = result.error.errors[0].message;
      passwordVerifyDirty = true;
    } else {
      passwordVerifyDirty = false;
    }

  }

  async function changePassword() {
    loading = true;

    try {
      const response = await UpdateService.updatePassword(email, password, newpassword);
      useToast({
        type: 'success',
        id: `UsernameModal_${Date.now()}`,
        visible: true,
        message: response.data.message,
        duration: 1500
      });
      setTimeout(() => {
        loading = false;
        handleModal();
        return response;
      }, 1700);
    } catch (error) {
      useToast({
        type: 'error',
        id: `UsernameModal_${Date.now()}`,
        visible: true,
        message: error.response?.data?.message || 'Server error',
        duration: 1500
      });
      setTimeout(() => {
        loading = false;
      }, 1700);
    }
  }

  const unsubscribe = toasts.subscribe((value) => {
    toastList = value;
  });

  onMount(() => {
    passwordInput.focus();
    return () => {
      unsubscribe();
    };
  });

  $: formFilled = !passwordDirty && !newpasswordDirty && !passwordVerifyDirty;

</script>

<form use:clickOutside
      on:outclick={handleModal}
      on:submit|preventDefault={changePassword}
>
  <div class="w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center gap-3">

    <div class="w-full h-10 z-10">
      {#if toastList.length > 0}
        <div class="w-full h-10 z-10"
             in:fly={{ x: 200, duration: 1000 }}
             out:fade={{duration:100}}
        >
          <Toaster toasts={toastList} />
        </div>
      {/if}
    </div>

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
          bind:this={passwordInput}
          bind:value={password}
          on:input={(event) => passwordValidate(event)}
        />
        {#if passwordDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{passwordError}</p>
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
        {#if newpasswordDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{newpasswordError}</p>
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
        {#if passwordVerifyDirty}
          <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium"
             in:fade={{ duration: 100 }}
             out:fade={{duration:100}}
          >{passwordVerifyError}</p>
        {/if}
      </div>
    </div>

    <div class="w-full flex justify-between gap-5">
      <Button
        themeName="cancel"
        type='button'
        on:click={handleModal}
      >
        Cancel
      </Button>

      <Button
        themeName="continue"
        type="submit"
        loading={loading}
        disabled={!formFilled || loading}
      >
        Continue
      </Button>
    </div>
  </div>

</form>
