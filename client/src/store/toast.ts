import { writable } from 'svelte/store';
import type { Toast } from '$lib/types/toast';


export const toasts = writable<Toast[]>([]);

export function addToast(newToast: Toast) {
  toasts.update(currentToasts => {
    return [...currentToasts, { ...newToast, visible: true }];
  });

  if (newToast.duration) {
    setTimeout(() => {
      removeToast(newToast.id);
    }, newToast.duration);
  }

}

export function removeToast(id: string) {
  toasts.update(currentToasts => {
    return currentToasts.map(toast => {
      if (toast.id === id) {
        return { ...toast, visible: false };
      }
      return toast;
    }).filter(toast => toast.visible);
  });
}
