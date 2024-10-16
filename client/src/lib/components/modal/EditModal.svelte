<script lang="ts">
  // Components
  import UsernameModal from '$lib/components/modal/_components/UsernameModal.svelte';
  import EmailModal from '$lib/components/modal/_components/EmailModal.svelte';
  import PasswordModal from '$lib/components/modal/_components/PasswordModal.svelte';

  // Functions
  export let handleModal: () => void;

  // Props
  export let type: 'username' | 'email' | 'password' = 'username';

</script>

{#if type === 'username'}
    <UsernameModal {handleModal} />
{/if}

{#if type === 'email'}
    <EmailModal {handleModal} />
{/if}

{#if type === 'password'}
    <PasswordModal {handleModal} />
{/if}
