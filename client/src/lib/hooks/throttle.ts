/**
 * Throttle function to ensure a callback is not called more often than the specified delay.
 *
 * @param callback - The function to be throttled.
 * @param delay - The delay in milliseconds to limit the function call rate.
 * @returns A throttled version of the callback function.
 */
export function throttle(callback: (...args: any[]) => void, delay: number) {
  let isThrottled = false;

  return function throttledCallback(...args: any[]) {
    if (!isThrottled) {
      callback(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}
