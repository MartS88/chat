<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Types
  import type { SocialNavItem } from '$lib/types/menu';

  // Data
  const socials: SocialNavItem[] = [
    { title: 'Youtube', href: 'https://youtube.com', icon: 'FaYoutube', color: 'red' },
    { title: 'Twitter', href: 'https://twitter.com', icon: 'FaTwitter', color: 'blue' },
    { title: 'Telegram', href: 'https://t.me/Marts88', icon: 'FaTelegram', color: 'lightblue' },
  ];


</script>

<footer class="w-full py-2 flex flex-row items-center justify-between border-t-[1.5px] border-gray-200 p-2">
  <span class="font-prompt">
    ©2024 BlockVision All rights reserved
  </span>

  <ul class="flex items-center gap-4">
    {#each socials as social}
      <li class="transform transition duration-300 hover:scale-110">
        <a href={social.href} target="_blank" rel="noopener" class="flex items-center justify-center h-8">
          <Icon iconType={social.icon} iconWidth="30" iconHeight="30" iconColor={social.color} />
        </a>
      </li>
    {/each}
  </ul>

</footer>
