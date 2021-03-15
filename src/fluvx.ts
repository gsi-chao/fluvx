import { reactive, readonly, computed } from "vue";
import { StoreContext, VStoreProps } from "./types";
import { isEmpty, isPromise } from "./util";

export class Store<T extends object> {
  state: T;

  mutations: Record<string, Function>;

  getters: Record<string, Function>;

  actions?: Record<string, Function>;

  constructor(props: VStoreProps<T>) {
    this.state = reactive<T>(props.state) as T;
    this.mutations = this.registerMutations(props.mutations);
    this.actions = this.registerActions(props.actions);
    this.getters = this.registerGetters(props.getters);
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type: string, payload?: unknown) {
    const mutation = this.mutations[type] || null;
    if (mutation) {
      mutation(payload);
    } else {
      throw Error("The mutation is not defined");
    }
  }

  dispatch(type: string, payload?: unknown) {
    if (this.actions && this.actions[type]) {
      const action = this.actions[type];
      return action(payload);
    }
    throw Error("The action is not defined");
  }

  registerMutations(mutation: Record<string, Function>) {
    if (!isEmpty(mutation)) {
      const mut: Record<string, Function> = {};
      Object.keys(mutation).forEach(value => {
        mut[value] = this.registerMutationCallback(this, mutation[value]);
      });
      return mut;
    }
    throw Error("It is necessary to define mutations to change states.");
  }

  registerMutationCallback(store: Store<T>, handler: Function) {
    return (payload: unknown) => {
      handler(store.state, payload);
    };
  }

  registerGetters(getters: Record<string, Function> | undefined) {
    if (getters && !isEmpty(getters)) {
      const gett: Record<string, Function> = {};
      Object.keys(getters).forEach(value => {
        Object.defineProperty(gett, value, {
          get: () =>
            this.registerGetterCallback(this, value, getters[value]).value,
          enumerable: true
        });
      });
      return gett;
    }
    return {};
  }

  registerGetterCallback(store: Store<T>, type: string, handler: Function) {
    return computed(() => handler(store.state));
  }

  registerActions(actions: Record<string, Function> | undefined) {
    if (actions && !isEmpty(actions)) {
      const act: Record<string, Function> = {};
      Object.keys(actions).forEach(value => {
        act[value] = this.registerActionCallback(this, actions[value]);
      });
      return act;
    }
    return {};
  }

  registerActionCallback(store: Store<T>, handler: Function) {
    return (payload: unknown) => {
      let response = handler(
        {
          commit: store.commit,
          dispatch: store.dispatch,
          state: store.state,
          getters: store.getters
        },
        payload
      );
      if (!isPromise(response)) {
        response = Promise.resolve(response);
      }
      return response;
    };
  }
}

export function createStore<T extends object>(
  props: VStoreProps<T>
): StoreContext<T> {
  const store = new Store<T>(props);

  return {
    dispatch: store.dispatch,
    commit: store.commit,
    state: readonly(store.state),
    getters: store.getters
  };
}
