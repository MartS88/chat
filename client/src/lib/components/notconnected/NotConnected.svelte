<script lang="ts">
  // Icons
  import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';
  import IoIosWifi from 'svelte-icons/io/IoIosWifi.svelte';


  export let onClick: () => void;

</script>

<div class="flex flex-col items-center justify-center gap-1.5 font-roboto">
  <div class="ml-auto translate-x-8" on:click={onClick}>
    <div class="w-8 h-8 text-white" on:click={onClick}>
      <IoIosCloseCircle />
    </div>
  </div>
  <div class="w-8 h-8  text-white" on:click={onClick}>
    <IoIosWifi />
  </div>

  <h1 class="text-center text-lg font-semibold">There is no Internet connection</h1>
  <ul class="flex flex-col items-start gap-1.5 list-disc pl-4">
    <li>Checking the network cables, modem, and router</li>
    <li>Reconnecting to Wi-Fi</li>
    <li>Running Connectivity Diagnostics</li>
  </ul>
  <p class="pt-1">ERR_INTERNET_DISCONNECTED</p>
</div>

<style>
    .font-roboto {
        font-family: 'Roboto', sans-serif;
    }
</style>

