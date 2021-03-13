export interface VStoreProps<T extends object> {
  state: T;
  getters?: Record<string, Function>;
  mutations: Record<string, Function>;
  actions?: Record<string, Function>;
}

export interface StoreContext<T extends object> {
  state: T;
  commit: (type: string, payload?: unknown) => Promise<unknown>;
  dispatch: (type: string, payload?: unknown) => void;
  getters: Record<string, Function>;
}
