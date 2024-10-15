<script lang="ts">
  import {goto} from '$app/navigation';

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Types
  import type {SidebarNavItem} from '$lib/types/menu';

  // Store
  import {searchInputState, toggleSidebarState} from '../../../../store/store';

  // Props
  export let sidebarItem: SidebarNavItem[] = [];

  // Variables
  let sidebarActive = false;
  let hoveredMenuItem: number | null = null;

  // Functions
  function toggleSidebarMenu(value: boolean) {
    sidebarActive = value;
  }

  function handleNavigate(url: string) {
    toggleSidebarMenu(false);
    toggleSidebarState(true);
    setTimeout(() => {
      toggleSidebarState(false);
    }, 1300);
    setTimeout(() => {
      goto(url);
    }, 1000);
  }

  function handleMouseEnter(hoveredIndex: number) {
    hoveredMenuItem = hoveredIndex;
  }

  function handleMouseLeave() {
    hoveredMenuItem = null;
  }

  //Data
  const menuItems: SidebarNavItem[] = [
    {
      icon: 'FaHome',
      title: 'BlockVision board',
      navigation: '/',
      handler: () => handleNavigate('/home')
    },
    {
      icon: 'FaExchangeAlt',
      title: 'Stake',
      navigation: '/stake',
      handler: () => handleNavigate('/stake')
    },
    {
      icon: 'FaMoneyCheckAlt',
      title: 'Dex Explorer',
      navigation: '/dex',
      handler: () => handleNavigate('/dex')
    },
    {
      icon: 'FaNewspaper',
      title: 'News Explorer',
      navigation: '/news',
      handler: () => handleNavigate('/news')
    },
    {
      icon: 'FaUser',
      title: 'User area',
      navigation: '/user-area',
      handler: () => handleNavigate('/user-area')
    },
    {
      icon: 'FaSearch',
      title: 'Search',
      navigation: '',
      handler: () => searchInputState.update((value) => !value)
    },
    {
      icon: 'FaNetworkWired',
      title: 'Api',
      navigation: '/http://localhost:5000/api/docs',
      handler: () => window.open('http://localhost:5000/api/docs', '_blank')
    }
  ];


</script>


<div
  class="sidebar_menu  {sidebarActive ? 'active' : ''}"
  on:mouseenter={() => toggleSidebarMenu(true)}
  on:mouseleave={() => toggleSidebarMenu(false)}
>
  <div class="sidebar_menu_wrapper">
    {#each menuItems as item,index}
      <div
        class="sidebar_menu_block"
        on:mouseenter={() => handleMouseEnter(index)}
        on:mouseleave={handleMouseLeave}
        on:click={item.handler}
      >
        <Icon
          iconType={item.icon}
          iconWidth={20}
          iconHeight={20}
          iconColor={hoveredMenuItem === index ? '#818ea3' : 'gray'}
          on:click={item.handler} />
        <span class="sidebar_menu_block_title">{item.title}</span>

      </div>
    {/each}
  </div>

</div>

<style lang="scss">
  .sidebar_menu {
    width: 45px;
    height: 100%;
    background: #0000001a;
    transition: all 0.2s ease-in-out;

    .sidebar_menu_wrapper {
      padding-top: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;

      .sidebar_menu_block {
        padding: 10px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          background: whitesmoke;

          .sidebar_menu_block_title {
            color: #818ea3;
          }
        }

        .sidebar_menu_block_title {
          display: none;
          width: 100%;
          font-size: 1rem;
          font-family: 'Prompt', sans-serif;
          color: gray;
          transition: all 0.2s ease-in-out;
        }
      }
    }

    &.active {
      width: 200px;
      transition: all 0.3s ease-in-out;

      .sidebar_menu_block {
        .sidebar_menu_block_title {
          display: block;
        }
      }
    }
  }
</style>

