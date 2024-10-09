<script lang="ts">

  // Props
  export let logoWidth: number = 45;
  export let logoHeight: number = 45;

  const logoUrl = '/logo.png';

</script>

<img src={logoUrl} alt="Logo" width={logoWidth} height={logoHeight}/>


<!--<script lang="ts">-->

<!--  //Components-->
<!--  import srcDesktop from '../../../../../static/desktop_logo.png'-->
<!--  import scrMobile from '../../../../../static/mobile_logo.png'-->

<!--  // Props-->
<!--  export let withTitle = false;-->
<!--  export let responsive = true;-->
<!--  export let alt = 'Oracle logo';-->
<!--  export let href = typeof window !== 'undefined' ? window?.location?.origin : '';-->


<!--</script>-->

<!--<a {href} class="logo {$$props.class}">-->
<!--  {#if responsive}-->
<!--    <img src={srcDesktop} {alt} class="mt-logo-img&#45;&#45;desktop" />-->
<!--    <img src={scrMobile} {alt} class="mt-logo-img&#45;&#45;mobile" />-->
<!--  {:else}-->
<!--    <img src={withTitle ? srcDesktop : scrMobile} {alt} />-->
<!--  {/if}-->
<!--</a>-->

<!--<style lang="scss">-->
<!--  .mt-logo {-->
<!--    @apply flex items-center flex-shrink-0;-->

<!--    &-img {-->
<!--      &&#45;&#45;desktop {-->
<!--        @apply hidden lg:inline-block;-->
<!--      }-->
<!--      &&#45;&#45;mobile {-->
<!--        @apply inline-block lg:hidden;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</style>-->
