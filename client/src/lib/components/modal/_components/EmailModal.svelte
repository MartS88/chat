<script lang="ts">
  import {z} from 'zod';
  import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';

  // Components
  import Popup from '$lib/components/popup/auth/Popup.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Variables
  let loading: boolean = false;
  let emailInput;
  let formFilled;


  let popupError = false;
  let popupType = '';
  let popupMsg = '';

  let email: string = '';
  let emailError: string | null = 'Email is required*';
  let emailDirty: boolean = false;

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';
  import {onMount} from 'svelte';

  // Service
  import {UpdateService} from '$lib/services/UpdateService';


  // Zod schema for validation
  const passwordSchema = z.string()
    .min(5, 'Password must contain more than 5 characters*')
    .nonempty('Password is required*');


  // Functions
  export let handleModal: () => void;

  function emailValidate(event: Event) {
    if (!event) {
      return;
    }
    email = event.detail;
    emailDirty = true;
    const result = passwordSchema.safeParse(email);

    if (!result.success) {
      emailError = result.error.errors[0].message;
    } else {
      emailError = null;
    }
  }


  function closePopup() {
    popupError = false;
  }

  async function changeEmail() {
    if (!email || emailError || emailDirty) {
      return;
    }
    popupMsg = '';
    popupError = false;
    loading = true;

    try {
      // const response = await UpdateService.updatePassword(email);
      // setTimeout(() => {
      //   popupType = 'success';
      //   popupError = true;
      //   popupMsg = response.data.message;
      // }, 300);
      // setTimeout(() => {
      //   loading = false;
      //   handleModal();
      //   return response;
      // }, 1500);
    } catch (error) {
      setTimeout(() => {
        popupType = 'client-error';
        popupMsg = error.response.data.message || 'Server error';
        popupError = true;
        loading = false;
      }, 1500);
    }
  }

  onMount(() => {
    emailInput.focus();
  });

  $: formFilled = !emailError;

</script>


<form class="w-96  bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center gap-3"
      use:clickOutside on:outclick={handleModal}>
  {#if popupError}
    <div class="w-full h-10 z-10" in:fly={{ x: 200, duration: 1000 }}>
      <Popup type={popupType} label={popupMsg} on:click={closePopup} />
    </div>
  {:else}
    <div class="h-5">
    </div>
  {/if}
  <div class="w-full flex justify-center items-center">
    <div class="bg-white shadow-lg p-6 w-auto flex justify-center">
      <div  class="w-8 h-8 text-gray-500">
        <IoIosMail/>
      </div>

    </div>
  </div>
  <div class="w-full flex justify-center items-center">
    <h2 class="text-2xl font-prompt">Change email</h2>
  </div>

  <div class="flex items-center justify-center">
    <hr class="border-t border-gray-300 w-full max-w-xl mx-auto" />
  </div>

  <div class="h-auto">
    <label for="username" class="block mb-1 text-sm font-medium text-gray-700">email</label>
    <div class="flex flex-col w-full items-start">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        themeName="primary"
        bind:this={emailInput}
        bind:value={email}
        on:input={(event) => validateEmail(event)}
      />
      {#if emailError && emailDirty}
        <p class="text-red-500 text-sm ml-0.5 mt-0.5 font-medium" in:fade={{ duration: 100 }}>{emailError}</p>
      {/if}
    </div>
  </div>

  <div class="w-full flex justify-between items-center gap-5">
    <Button
      themeName="cancel"
      type="button"
      on:click={handleModal}>
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
</form>