<script>
  export let data
  export let error;

  console.log('data', data);

  let newData = data.posts
  let loading = false;


  const clickHandler = async () => {
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 2000);
  };

  console.log('data in PAGE:', data);
</script>

<h1>My profile</h1>

<button on:click={clickHandler}>Click to reload data</button>

{#if newData && !loading}
  <ul>
    {#each newData as item}
      <li>{item.title}</li>
    {/each}
  </ul>
{:else if error}
  <p>{error}</p>
{:else if loading}
  <p>Loading...</p>
{/if}
