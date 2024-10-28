<script lang="ts">
  import {z} from 'zod';
  import {onMount} from 'svelte';

  // Icon
  import FaEdit from 'svelte-icons/fa/FaEdit.svelte';

  // Components
  import Toaster from '$lib/components/toast/Toaster.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Type
  import type {Toast} from '$lib/types/toast';

  // Transitions
  import {fade, fly} from 'svelte/transition';

  // Store
  import {toasts} from '../../../../store/toast';

  // Variables
  let loading: boolean = false;
  let textInput;

  let username: string = '';
  let usernameError: string = ''
  let usernameDirty = true

  let toastList = [];

  // Hooks
  import {clickOutside} from '$lib/hooks/click_outside';
  import {useToast} from '$lib/components/toast/usetoast';

  // Service
  import {UpdateService} from '$lib/services/UpdateService';

  // Zod schema for validation
  const usernameSchema = z.string()
    .min(4, 'Username must contain more than 3 characters*')
    .nonempty('Username is required*');

  // Functions
  export let handleModal: () => void;

  function addToast(toast: Toast) {
    useToast(toast);
  }

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

  async function changeUsername() {
    loading = true;
    try {
      const email = localStorage.getItem('email');
      const response = await UpdateService.updateUsername(email, username);
      addToast({
        type: 'success',
        id: `UsernameModal_${Date.now()}`,
        visible: true,
        message: response.data.message,
        duration: 1500,
      });
      setTimeout(() => {
        loading = false;
       handleModal();
        return response;
      }, 1700);

    } catch (error) {
      addToast({
        type: 'error',
        id: `UsernameModal_${Date.now()}`,
        visible: true,
        message: error.response?.data?.message || 'Server error',
        duration: 1500,
      });
      setTimeout(() => {
        loading = false;
      }, 1700);
    }
  }

  const unsubscribe = toasts.subscribe(value => {
    toastList = value;
  });

  onMount(() => {
    textInput.focus();
    return () => {
      unsubscribe();
    };
  });

  $: formFilled = !usernameDirty;

</script>

<form class="w-96 h-auto bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between gap-3"
      use:clickOutside
      on:outclick={handleModal}
      on:submit|preventDefault={changeUsername}
>

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
    <div class="bg-white shadow-lg p-6 w-auto flex justify-center">
      <div class="w-8 h-8 text-gray-500">
        <FaEdit />
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center items-center">
    <h2 class="text-2xl font-prompt">Edit username</h2>
  </div>
  <div class="flex items-center justify-center">
    <hr class="border-t border-gray-300 w-full max-w-xl mx-auto" />
  </div>

  <div class="h-auto">
    <label for="username" class="block mb-1 text-sm font-medium text-gray-700">username</label>
    <Input
      type="text"
      name="username"
      placeholder="Username"
      themeName="primary"
      bind:this={textInput}
      bind:value={username}
      on:input={validateUsername}
    />
    {#if usernameDirty}
      <p class="text-red-500 text-sm ml-0.5 mt-0.5 mb-0.5 font-medium"
         in:fade={{ duration: 100 }}
         out:fade={{duration:100}}
      >
        {usernameError}
      </p>
    {/if}
  </div>

  <div class="w-full flex justify-between items-center gap-5">
    <Button
      themeName="cancel"
      type='button'
      on:click={handleModal}>
      Cancel
    </Button>

    <Button
      themeName="continue"
      type='submit'
      loading={loading}
      disabled={!formFilled || loading}
    >
      Continue
    </Button>
  </div>
</form>

