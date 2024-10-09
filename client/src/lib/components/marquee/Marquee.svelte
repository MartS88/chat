<script lang="ts">


  let showMenu = false;

  let pairs = [
    { icon: '🔥', label: 'HOT PAIRS', value: '' },
    { icon: '🥇', label: '3 Neiro', value: '+2.21%', color: 'text-green-500' },
    { icon: '🔴', label: '#4 GOU', value: '-22.64%', color: 'text-red-500' },
    { icon: '🥈', label: '#5 DOGGO', value: '+70.47%', color: 'text-green-500' },
    { icon: '🇺🇸', label: '#6 MAGA', value: '+10.52%', color: 'text-green-500' },
    { icon: '🥉', label: '#7 PEIPEI', value: '+33.97%', color: 'text-green-500' },
    { icon: '🟢', label: '#8 TRUMP', value: '+39.99%', color: 'text-green-500' },
    { icon: '🔵', label: '#9 HANA', value: '-8.62%', color: 'text-red-500' },
    { icon: '🎲', label: 'Web3Casino', value: '', color: '' },
  ];


  let menuIcon = [
    { icon: '🔥', label: 'token' },
    { icon: '🔥', label: 'nft' },
    { icon: '🔥', label: 'market' },
  ];

  let activeLabel = 'token';

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function closeMenu() {
    showMenu = false;
  }

  function setLabel(label: string) {
    activeLabel = label;
    closeMenu();
  }

</script>

<div class="w-full flex items-center justify-center border border-gray-300 bg-gray-100 rounded-md shadow-sm"
     style="max-width: 700px;">
  <div class="w-full  h-ful relative inline-block text-left">

    <button
      class="w-28 flex items-center gap-1 px-1 py-1  text-black rounded-md hover:bg-gray-100  transition-colors shadow-sm"
      on:click={toggleMenu}
    >
      <span>🔥</span>
      <span class="text-sm font-semibold">{activeLabel}</span>
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.07 0L10 10.92l3.7-3.71a.75.75 0 0 1 1.07 1.06l-4.25 4.25a.75.75 0 0 1-1.07 0L5.23 8.27a.75.75 0 0 1 0-1.06z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>


    {#if showMenu}
      <div class="absolute left-0  w-28 bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-30">
        {#each menuIcon as item}
          <a
            href="#"
            class="flex items-center gap-2 px-3 py-1 hover:bg-custom-gray-transparent text-black transition-colors"
            on:click={() => setLabel(item.label)}
          >
            <span>{item.icon}</span>
            <span class="text-sm">{item.label}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>


  <div
    class="marquee-container overflow-hidden whitespace-nowrap bg-gray-100 text-black  flex items-center rounded-md shadow-sm">
    <div class="marquee-content flex items-center animate-marquee gap-4">
      {#each pairs as pair}
        <div class="flex items-center gap-2 px-3 py-1   min-w-[120px]">
          <span>{pair.icon}</span>
          <span class="font-semibold text-sm  cursor-pointer">{pair.label}</span>
          {#if pair.value}
            <span class={pair.color}>{pair.value}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>

    .marquee-content {
        animation: marquee 30s linear infinite;

        &:hover {
            animation-play-state: paused;
        }
    }

    @keyframes marquee {
        from {
            transform: translateX(40%);
        }
        to {
            transform: translateX(-100%);
        }
    }
</style>
