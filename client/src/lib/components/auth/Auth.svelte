<script lang="ts">

  // Components
  import Signup from '$lib/components/auth/signup/Signup.svelte';
  import Login from '$lib/components/auth/login/Login.svelte';
  import PasswordRecovery from '$lib/components/auth/password_recovery/PasswordRecovery.svelte';


  let authMode = 'signup'
  function setMode(value:string){
    authMode = value
  }

</script>


{#if authMode === 'signup'}
  <Signup {setMode}/>
{:else if authMode === 'login'}
  <Login {setMode}/>
{:else if authMode === 'passwordRecovery'}
  <PasswordRecovery {setMode}/>
{/if}



