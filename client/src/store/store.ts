import {type Writable, writable} from 'svelte/store';


export const sidebarMenuState: Writable<boolean> = writable(false);
export const searchInputState: Writable<boolean> = writable(false);
export const inputActive: Writable<boolean> = writable(false);
export const authModalState: Writable<boolean> = writable(false);


export function toggleInput() {
  inputActive.update(value => !value);
}

export async function toggleSidebarState(value: boolean) {
  sidebarMenuState.update(sidebarMenuValue => value);
}

export function closeAuthModal() {
  authModalState.update(value => false);
}

function createAccessTokenStore() {
  let initialValue = null;

  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem('accessToken');
  }

  const {subscribe, set} = writable(initialValue);

  return {
    subscribe,
    set: (value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', value);
      }
      set(value);
    },
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
      set(null);
    }
  };
}

function createEmailStore() {
  let initialValue = null;

  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem('email');

  }
  const {subscribe, set} = writable(initialValue);

  return {
    subscribe,
    set: (value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('email', value);
      }
      set(value);
    },
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('email');
      }
      set(null);
    }
  };
}

function createIsActivatedStore(){
  let initialValue = null;
  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem('isActivated')
  }
  const {subscribe, set} = writable(initialValue);

  return {
    subscribe,
    set: (value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isActivated', value);
      }
      set(value);
    },
    clear: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isActivated');
      }
      set(null);
    }
  };
}

export const accessTokenStore = createAccessTokenStore();
export const emailStore = createEmailStore();
export const isActivatedStore = createIsActivatedStore()