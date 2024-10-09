<script lang="ts">
  // Types
  import type { IMenuItem } from '$lib/types/menu';

  // Props
  export let hovered = false;
  export let menu: IMenuItem[] = [];

  // Data
  const activeClass = 'mt-menu-item--active';
  let submenuHeight = 0;
  let reactiveMenu = menu;

  // Methods
  /**
   * On mouse over
   * @param e
   */
  const onMouseOver = (e: MouseEvent | FocusEvent, index: number) => {
    const target = e.target as HTMLElement;

    const item = reactiveMenu[index];
    reactiveMenu[index].class = item.class?.includes(activeClass)
      ? item.class
      : `${item.class} ${activeClass}`;

    if (!hovered) {
      hovered = true;
      const submenuInner = (target?.querySelector('.mt-submenu-inner') as HTMLElement) ?? null;
      if (submenuInner) {
        submenuHeight = submenuInner.offsetHeight;
      }
    }
  };

  /**
   * On mouse out
   */
  const onMouseOut = (index: number) => {
    const item = reactiveMenu[index];
    const classes = item.class ? item.class.split(' ') : [];
    reactiveMenu[index].class = item.class?.includes(activeClass)
      ? classes.filter((el) => el !== activeClass).join(' ')
      : item.class;

    if (hovered) {
      hovered = false;
      submenuHeight = 0;
    }
  };

  /**
   * On link click
   */
  const onLinkClick = () => {};
</script>

<ul class="mt-menu body-small {$$props.class ?? ''}">
  {#each reactiveMenu as item, index}
    <li
      class="mt-menu-item {item.class ?? ''}"
      on:mouseover={(e) => {
        onMouseOver(e, index);
      }}
      on:focus={(e) => {
        onMouseOver(e, index);
      }}
      on:mouseleave={() => {
        onMouseOut(index);
      }}
    >
      <span class="mt-menu-item--element">
        {item.title}
      </span>

      {#if item.submenu && item.submenu.length > 0}
        <div class="mt-submenu-wrapper subtitle-2">
          <div class="mt-submenu-inner">
            {#each item.submenu as subitem}
              <ul class="mt-submenu-menu">
                {#if subitem.title}
                  <p class="mt-submenu-menu--title button-small">
                    {subitem.title}
                  </p>
                {/if}

                {#each subitem.list as subsubitem}
                  <li class="mt-submenu-menu-item {subsubitem.class ?? ''}">
                    <a
                      href={subsubitem.href}
                      class="mt-submenu-menu-item--link"
                      on:click={onLinkClick}
                    >
                      {subsubitem.title}
                    </a>
                  </li>
                {/each}
              </ul>
            {/each}
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>

<div
  role="banner"
  class="mt-synth-wrapper"
  class:hidden={!hovered}
  class:block={hovered}
  style="height: {submenuHeight}px;"
  on:mouseleave={() => {
    onMouseOut(0);
  }}
/>

<style lang="scss">
  // Parent header must be relative
  .mt-synth-wrapper {
    @apply absolute top-[calc(100%-1px)] inset-x-0 z-0;
    @apply w-full cursor-default;
    @apply bg-white border-t border-t-gray-200;
  }

  .mt-menu {
    @apply flex items-center;
    @apply relative z-[1];

    &-item {
      @apply cursor-pointer;
      @apply px-5 py-4;
      @apply cursor-pointer;
      @apply flex items-center h-[52px];
      @apply text-gray-600 text-sm;

      &--element {
        @apply pointer-events-none;
        @apply block py-4 h-[52px];
        @apply border-b border-b-transparent;
        @apply transition-all;
      }

      &:first-child {
        @apply pl-0;
      }

      .mt-submenu {
        &-wrapper {
          @apply hidden;
          @apply absolute top-full inset-x-0 z-[1];
          @apply w-full;
          @apply cursor-default;
        }
        &-inner {
          @apply w-full max-w-2xl;
          @apply grid grid-cols-3 gap-x-20;
        }
        &-menu {
          @apply text-gray-600;
          @apply flex flex-col gap-y-3 py-6;
          @apply w-full min-w-64;

          &--title {
            @apply text-base font-medium cursor-default;
          }
          &-item {
            &--link {
              @apply block w-full text-sm font-normal;

              &:hover {
                @apply text-gray-700;
              }
            }
          }
        }
      }

      &--active,
      &:hover {
        .mt-menu-item--element {
          @apply text-gray-700;
          @apply border-b-gray-700;
        }

        .mt-submenu-wrapper {
          @apply block;
        }
      }
    }
  }
</style>
