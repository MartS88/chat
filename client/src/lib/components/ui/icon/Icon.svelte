<!--<script lang="ts">-->
<!--  import {createEventDispatcher} from 'svelte';-->

<!--  const dispatch = createEventDispatcher();-->

<!--  // Types-->
<!--  import type {IconColor} from '$lib/types/icon';-->

<!--  // Icons-->
<!--  import FaHome from 'svelte-icons/fa/FaHome.svelte';-->
<!--  import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte';-->
<!--  import FaMoneyCheckAlt from 'svelte-icons/fa/FaMoneyCheckAlt.svelte';-->
<!--  import FaNewspaper from 'svelte-icons/fa/FaNewspaper.svelte';-->
<!--  import FaUser from 'svelte-icons/fa/FaUser.svelte';-->
<!--  import FaNetworkWired from 'svelte-icons/fa/FaNetworkWired.svelte';-->
<!--  import FaPowerOff from 'svelte-icons/fa/FaPowerOff.svelte';-->
<!--  import FaSearch from 'svelte-icons/fa/FaSearch.svelte';-->
<!--  import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte';-->
<!--  import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';-->
<!--  import FaTelegram from 'svelte-icons/fa/FaTelegram.svelte';-->
<!--  import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';-->
<!--  import GiPadlock from 'svelte-icons/gi/GiPadlock.svelte';-->
<!--  import FaRegEyeSlash from 'svelte-icons/fa/FaRegEyeSlash.svelte';-->
<!--  import FaRegEye from 'svelte-icons/fa/FaRegEye.svelte';-->
<!--  import IoIosCloseCircleOutline from 'svelte-icons/io/IoIosCloseCircleOutline.svelte';-->
<!--  import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';-->
<!--  import IoIosWifi from 'svelte-icons/io/IoIosWifi.svelte';-->
<!--  import IoMdPersonAdd from 'svelte-icons/io/IoMdPersonAdd.svelte';-->
<!--  import IoIosLock from 'svelte-icons/io/IoIosLock.svelte';-->
<!--  import FaRocketchat from 'svelte-icons/fa/FaRocketchat.svelte';-->
<!--  import FaEdit from 'svelte-icons/fa/FaEdit.svelte'-->
<!--  import GoKebabHorizontal from 'svelte-icons/go/GoKebabHorizontal.svelte'-->
<!--  import GoSettings from 'svelte-icons/go/GoSettings.svelte'-->
<!--  import FaExpeditedssl from 'svelte-icons/fa/FaExpeditedssl.svelte'-->
<!--  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte'-->

<!--  // Props-->
<!--  export let iconWidth: number = 45;-->
<!--  export let iconHeight: number = 45;-->
<!--  export let iconColor: IconColor = 'whitesmoke';-->
<!--  export let iconType: string = 'FaHome';-->

<!--  const icons = {-->
<!--    FaHome,-->
<!--    FaExchangeAlt,-->
<!--    FaMoneyCheckAlt,-->
<!--    FaNewspaper,-->
<!--    FaUser,-->
<!--    FaNetworkWired,-->
<!--    FaPowerOff,-->
<!--    FaSearch,-->
<!--    FaYoutube,-->
<!--    FaTwitter,-->
<!--    FaTelegram,-->
<!--    IoIosMail,-->
<!--    GiPadlock,-->
<!--    FaRegEyeSlash,-->
<!--    FaRegEye,-->
<!--    IoIosCloseCircleOutline,-->
<!--    IoIosCloseCircle,-->
<!--    IoIosWifi,-->
<!--    IoMdPersonAdd,-->
<!--    IoIosLock,-->
<!--    FaRocketchat,-->
<!--    GoKebabHorizontal,-->
<!--    GoSettings,-->
<!--    FaEdit,-->
<!--    FaExpeditedssl,-->
<!--    FaCheckCircle-->


<!--  };-->

<!--  $: iconType = icons[iconType] || FaHome;-->

<!--  function onClick(event: Event) {-->
<!--    dispatch('click', event);-->
<!--  }-->


<!--</script>-->

<!--<div class="icon" style="&#45;&#45;icon-width: {iconWidth}px; &#45;&#45;icon-height: {iconHeight}px; &#45;&#45;icon-color: {iconColor}"-->
<!--     on:click={onClick}>-->
<!--  <svelte:component-->
<!--    this={iconType}-->
<!--  />-->
<!--</div>-->

<!--<style>-->
<!--    .icon {-->
<!--        display: inline-flex;-->
<!--        width: var(&#45;&#45;icon-width);-->
<!--        height: var(&#45;&#45;icon-height);-->
<!--        color: var(&#45;&#45;icon-color);-->
<!--        z-index: 0;-->
<!--    }-->
<!--</style>-->