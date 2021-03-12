import { createStore, ActionContext } from "@/index";

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
        increment({ commit }: ActionContext<OurState>, payload: unknown) {
          commit("increment", payload);
        }
      }
    });

    expect(store.state.count).toEqual(0);
    store.dispatch("increment", 1);
    expect(store.state.count).toEqual(1);
  });
});
