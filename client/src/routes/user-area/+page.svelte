<script>

  // Components
  import Center from '$lib/components/structure/containers/Center.svelte';
  import Cabinet from './_components/Cabinet.svelte';


</script>


  <Center>
    <h1>Setting</h1>
    <Cabinet />
  </Center>


<style>

</style>

<!--<script>-->
<!--  import { goto, beforeNavigate, afterNavigate } from '$app/navigation';-->

<!--  const handleClick = () => {-->
<!--    prompt('Placing your order');-->
<!--    goto('/products/', { replaceState: true });-->
<!--  };-->


<!--  beforeNavigate((navigation) => {-->
<!--    console.log({ before: navigation });-->
<!--  }),-->
<!--    afterNavigate((navigation) => {-->
<!--      console.log({ after: navigation });-->
<!--    });-->
<!--</script>-->

<!--<div>-->

<!--  <h1>Welcome to SvelteKit</h1>-->
<!--  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>-->
<!--  <button on:click={handleClick}>Place order</button>-->


<!--  <a href="/blog">Blog</a>-->
<!--  <a href="/products">Products</a>-->
<!--  <a href="/profile">Profile</a>-->
<!--  <a href="/products">Products</a>-->
<!--  <a href="/store">Store</a>-->

<!--</div>-->

