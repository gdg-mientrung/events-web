/**
 * Augment the typings of Vue.js
 */

import Vue, { ComponentOptions } from "vue";
import { CookieAttributes } from "js-cookie";

// import { Company, Job } from "./modals";

// todo: context?
interface StorageCookieOptions extends CookieAttributes {
  cookie: {
    prefix: string;
    options?: StorageCookieOptions;
  };
}
interface Storage {
  setUniversal(key: string, value: any, isJson?: boolean): string;
  getUniversal(key: string, isJson?: boolean): any;
  syncUniversal(key: string, defaultValue: any, isJson?: boolean): any;
  // Local State
  setState(key: string, val: any): string;
  getState(key: string): string;
  watchState(key: string, handler: (newValue: any) => void);
  // Cookies
  setCookie(key: string, val: any, options?: StorageCookieOptions);
  getCookie(key: string, isJson?: boolean): any;
  // Local Storage
  setLocalStorage(key: string, val: any, isJson?: boolean);
  getLocalStorage(key: string, isJson?: boolean): any;
}

interface Auth {
  ctx: any;
  $state: any; // todo: type this
  $storage: Storage;
  user: any;
  loggedIn: boolean;
  loginWith(strategyName: string, ...args): Promise<never>;
  login(...args): Promise<never>;
  logout(): Promise<never>;
  fetchUser(): Promise<never>;
  hasScope(scopeName: string): boolean;
  setToken(strategyName: string, token?: string): string;
  syncToken(strategyName: string): string;
  onError(handler: (error: Error, name: string, endpoint: any) => void);
  reset(): Promise<never>;
  redirect(name: string);
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: Auth;
    $t: any;
    getBase64(img, callback);
  }
}
