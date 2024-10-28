import type { Toast } from '$lib/types/toast';
import { addToast } from '../../../store/toast';


export function useToast(toast: Partial<Toast>) {

  const newToast: Toast = {
    type: toast.type || 'blank',
    id: toast.id || `${Date.now()}`,
    message: toast.message || '',
    duration: toast.duration ?? 1500,
    visible: true,
    ...toast,
  };
  addToast(newToast);
}
