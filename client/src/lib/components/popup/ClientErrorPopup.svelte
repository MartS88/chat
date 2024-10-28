<script>
  // Icon
  import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';

  export let onClick;
  export let label;

</script>
<div class="w-full h-full popup flex items-center bg-black text-white px-5 py-2 gap-2 rounded-lg shadow-lg z-100">
  <div class="flex items-center justify-center text-white rounded-full w-5 h-5 mr-2 cursor-pointer">
    <div class="w-6 h-6 b text-red-500" on:click={onClick}>
      <IoIosCloseCircle />
    </div>

  </div>
  <span class="text-center">{label}</span>
</div>