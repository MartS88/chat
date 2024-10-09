/**
 * Hook to handle click outside of the given element.
 * @param node - The HTML element to detect clicks outside of.
 */

export function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}


//
// import { onMount, onDestroy } from 'svelte';
//
// type Callback = () => void;
//
// /**
//  * Hook to handle click outside of the given element.
//  * @param node - The HTML element to detect clicks outside of.
//  * @param callback - The callback function to call when a click outside is detected.
//  */
// export function useClickOutside(node: HTMLElement, callback: Callback) {
//   function handleClickOutside(event: MouseEvent) {
//     if (node && !node.contains(event.target as Node)) {
//       callback();
//     }
//   }
//
//   onMount(() => {
//     document.addEventListener('click', handleClickOutside, true);
//   });
//
//   onDestroy(() => {
//     document.removeEventListener('click', handleClickOutside, true);
//   });
// }
