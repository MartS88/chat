<script lang="ts">

    // Components
    import Icon from '$lib/components/ui/icon/Icon.svelte';
    export let onClick: () => void;

</script>

<div class="flex flex-col items-center justify-center gap-1.5 font-roboto">
    <div class="ml-auto translate-x-8" on:click={onClick}>
        <Icon
          iconType="IoIosCloseCircle"
          iconWidth="30"
          iconHeight="30"
          iconColor="red"
        />
    </div>

    <Icon
      iconType="IoIosWifi"
      iconWidth="30"
      iconHeight="30"

    />
    <h1 class="text-center text-lg font-semibold">There is no Internet connection</h1>
    <ul class="flex flex-col items-start gap-1.5 list-disc pl-4">
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
        <li>Running Connectivity Diagnostics</li>
    </ul>
    <p class="pt-1">ERR_INTERNET_DISCONNECTED</p>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    .font-roboto {
        font-family: 'Roboto', sans-serif;
    }
</style>

