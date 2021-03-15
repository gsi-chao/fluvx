import { createStore, StoreContext } from "../../../src";

interface OurState {
  count: number;
  person: {
    firstName: string;
  };
}

describe("test state of store", () => {
  const testState = {
    count: 0,
    person: {
      firstName: "John"
    }
  };
  test("Create New Store", () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      }
    });
    expect(store.state.count).toBe(0);
    expect(store.state.person.firstName).toBe("John");
  });

  test("Test Mutations", () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      }
    });
    expect(store.state.count).toBe(0);
    store.commit("increment", 1);
    expect(store.state.count).toBe(1);
  });

  test("Test not defined Mutations", () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      }
    });
    const run = () => store.commit("inc", 1);
    expect(run).toThrow("The mutation is not defined");
  });

  test("Test create store with not mutations", () => {
    const run = () =>
      createStore<OurState>({
        state: { ...testState },
        mutations: {}
      });
    expect(run).toThrow(
      "It is necessary to define mutations to change states."
    );
  });

  test("Test Getters", async () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      },
      getters: {
        mult(state: OurState) {
          return state.count * 2;
        }
      }
    });

    expect(store.getters?.mult).toEqual(0);
    store.commit("increment", 1);
    expect(store.getters?.mult).toEqual(2);
  });

  test("Test Actions", async () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      },
      actions: {
        increment({ commit }: StoreContext<OurState>, payload: unknown) {
          commit("increment", payload);
        }
      }
    });

    expect(store.state.count).toEqual(0);
    store.dispatch("increment", 1);
    expect(store.state.count).toEqual(1);
  });

  test("Test not defined Action", () => {
    const store = createStore<OurState>({
      state: { ...testState },
      mutations: {
        increment(state: OurState, n: number) {
          state.count += n;
        }
      },
      actions: {
        increment({ commit }: StoreContext<OurState>, payload: unknown) {
          commit("increment", payload);
        }
      }
    });
    const run = () => store.dispatch("inc", 1);
    expect(run).toThrow("The action is not defined");
  });
});
