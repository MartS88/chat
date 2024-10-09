<script lang="ts">

  // Props
  export let type:'dots' | 'dual_ring' = 'dual_ring'
  export let logoWidth: number = 100
  export let logoHeight: number = 100;

  const logoUrl = type === 'dual_ring' ? 'dual_ring.svg' : 'dots.svg';
  // const logoUrl = '/dual_ring.svg';

</script>

<img type={type} src={logoUrl} alt="Loading..." width={logoWidth} height={logoHeight}/>