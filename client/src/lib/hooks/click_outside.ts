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
