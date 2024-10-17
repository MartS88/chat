<script lang="ts">

  // Components
  import Signup from '$lib/components/auth/signup/Signup.svelte';
  import Login from '$lib/components/auth/login/Login.svelte';
  import PasswordRecovery from '$lib/components/auth/password_recovery/PasswordRecovery.svelte';

  let mode = 'signup'
  function setMode(value:string){
    mode = value
  }



</script>


{#if mode === 'signup'}
  <Signup {setMode}/>
{:else if mode === 'login'}
  <Login {setMode}/>
{:else if mode === 'password-recovery'}
  <PasswordRecovery {setMode}/>
{/if}



