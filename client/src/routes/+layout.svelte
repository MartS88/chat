<script>
  import {page} from '$app/stores';

  // Transition
  import {fade, fly} from 'svelte/transition';

  //Styles
  import '$lib/style/app.css';

  //Components
  import Header from '$lib/components/structure/header/Header.svelte';
  import Footer from '$lib/components/structure/footer/Footer.svelte';
  import SidebarMenu from '$lib/components/structure/sidebar_menu/SidebarMenu.svelte';
  import Logo from '$lib/components/ui/logo/Logo.svelte';
  import Auth from '$lib/components/auth/Auth.svelte';

  // Store
  import {searchInputState, authModalState, sidebarMenuState} from '../store/store';

  $: searchState = $searchInputState;
  $: authModal = $authModalState;
  $: sidebarState = $sidebarMenuState;
  $: authPath = $page.url.pathname.startsWith('/auth');

</script>

{#if !authPath}
  <div class="w-full max-w-[2000px] mx-auto">
    <Header />
    <main>
      {#if searchState}
        <div in:fade={{ duration: 1000 }} class="search_list">
          <Logo logoWidth="192" logoHeight="192" />
        </div>
      {:else}
        <div class="main_left_block" in:fly={{ y: 200, duration: 500 }}>
          <SidebarMenu />
        </div>
        <div class="main_right_block" class:active={$sidebarMenuState} in:fade={{ duration: 700 }}>
          {#if $sidebarMenuState}
            <div in:fade={{ duration: 700 }}>
              <Logo logoWidth="192" logoHeight="192" />
            </div>
          {:else}
            <slot />
          {/if}
        </div>
      {/if}
    </main>
    {#if authModal}
      <div class="auth_popup" in:fade={{ duration: 100 }}>
        <Auth />
      </div>
    {/if}
    <Footer />
  </div>
{:else}
  <div class="auth_patch" in:fly={{ y: 200, duration: 500 }}>
    <slot />
  </div>
{/if}

<style lang="scss">
  .auth_popup {
    align-items: center;
    background: rgba(0, 0, 0, .2);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

  main {
    padding-left: 5px;
    padding-right: 5px;
    margin: 0 auto;
    width: 100%;
    height: 830px;
    display: flex;
    justify-content: center;
    align-items: center;

    .search_list {
      width: 100%;
      height: 100%;
      background: whitesmoke;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .main_left_block {
      width: 15%;
      margin-right: auto;
      height: 830px;
    }

    .main_right_block {
      margin: 0 auto;
      width: 97%;
      height: 100%;
      transition: all 0.7s ease;
      overflow-x: hidden;
      overflow-y: auto;


      &.active {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 480%;
        background: black;

      }
    }
  }
</style>
