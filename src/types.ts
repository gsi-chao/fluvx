import { DeepReadonly, Ref, UnwrapRef } from "@vue/reactivity";

export interface VStoreProps<T extends object> {
  state: T;
  getters?: Record<string, Function>;
  mutations: Record<string, Function>;
  actions?: Record<string, Function>;
}
declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>;

export interface StoreContext<T extends object> {
  state: DeepReadonly<UnwrapNestedRefs<T>>;
  commit: (type: string, payload?: unknown) => void;
  dispatch: (type: string, payload?: unknown) => void;
  getters: Record<string, Function>;
}
