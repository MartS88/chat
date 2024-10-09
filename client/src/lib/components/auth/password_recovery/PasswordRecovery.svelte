<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';

  // Store
  import { closeAuthModal } from '../../../../store/store';

  // Hooks
  import { clickOutside } from '$lib/hooks/click_outside';


  export let setMode: (value: string) => void;
  let username: string = '';
  let email: string = '';
  let verificationCode: string = '';
  let password: string = '';
  let confirmPassword: string = '';


</script>

<section class="flex flex-col items-center bg-gray-50 p-5 w-full max-w-md mx-auto rounded-lg shadow-lg"
         use:clickOutside on:outclick={closeAuthModal}
>
  <div class="flex flex-col items-center mb-8">
    <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
      <Icon iconType="IoIosLock" iconColor="black" />
    </div>
    <h2 class="text-2xl font-bold mb-2">Password Recovery</h2>

  </div>

  <div class="flex flex-col items-center gap-5 w-full p-2">
    <Input
      type="email"
      placeholder="Email"
      themeName="primary"
    />

    <div
      class="flex items-center w-full h-auto border border-gray-300 rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:border-purple-600">
      <Input
        type="text"
        placeholder="Verification code"
        themeName="verification"
      />
      <Button
        themeName="send"
      >
        Send Code
      </Button>
    </div>


    <Input
      type="password"
      placeholder="Password"
      themeName="primary"
    />

    <Input
      type="password"
      placeholder="Confirm password"
      themeName="primary"
    />

    <div class="flex w-full justify-between gap-5">
      <Button
        themeName="cancel"
        on:click={closeAuthModal}
      >
        Cancel
      </Button>

      <Button
        themeName="continue"
      >
        Continue
      </Button>
    </div>


    <p class="text-center text-gray-500  mr-auto">
      Back to
      <Button themeName="link" on:click={() => setMode('login')}>Log in</Button>
    </p>
  </div>

</section>