<script lang="ts">
  export let type: 'dots' | 'dual_ring' = 'dual_ring';
  export let logoWidth: number = 100;
  export let logoHeight: number = 100;

  const logoUrl = type === 'dual_ring' ? '/dual_ring.svg' : '/dots.svg';
</script>

<img src={logoUrl} alt="Loading..." width={logoWidth} height={logoHeight} />
