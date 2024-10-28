<script>
  // Icons
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';

  export let onClick;
  export let label;
</script>
<div
  class="w-full h-full popup flex items-center bg-green-500 text-white px-10 py-2 rounded-lg shadow-lg z-100"
>
  <div class="flex items-center justify-center rounded-full w-5 h-5 mr-2 cursor-pointer">
    <div class="w-6 h-6 b text-white" on:click={onClick}>
      <FaCheckCircle />
    </div>
  </div>
  <span class="text-center font-semibold">{label || 'Operation successful!'}</span>
</div>