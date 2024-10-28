import type {SvelteComponent} from 'svelte';
export type Renderable = string | JSX.Element | SvelteComponent;

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';

export interface IconTheme {
  primary: string;
  secondary: string;
  third:string;
}

export interface Toast {
  type: ToastType;
  id: string;
  visible: boolean;
  message: string;
  duration: number;

  style?: string;
  className?: string;
  height?: number;
  icon?: string | Renderable;
  iconTheme?: IconTheme;
}
