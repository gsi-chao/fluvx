![CI](https://github.com/gsi-chao/fluvx/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/gsi-chao/fluvx/branch/main/graph/badge.svg)](https://codecov.io/gh/gsi-chao/fluvx)
[![npm version](https://badge.fury.io/js/fluvx.svg)](https://badge.fury.io/js/fluvx)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


# Fluvx
<img src='https://raw.githubusercontent.com/gsi-chao/fluvx/main/fluvx.png' alt="Fluvx">

Fluvx is a stage manager inspired in Vuex API and base on Reactivity API from Vue 3. Its main goal is simplicity and for this it provides composable functions to create stores in a simple way. It is written in Typescript and has full support.

## How install
```bash
yarn add fluvx
```

## How to use

### Declare a store
```ts
// import composable function and Context Interface
import { StoreContext, createStore } from "fluvx";

// create store interface
interface OurState {
  count: number;
  person: {
    firstName: string;
  };
}

const initState: OurState = {
    count: 1,
    person: {
        firstName: 'Fluvx'
    }
}

const store = createStore<OurState>({
      state: initState,
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
      getters: {
        multByTwo(state: OurState): number {
          return state.count * 2;
        }
      }
    });
```
### Add to the main component as a provider

```ts
...
export default defineComponent({
  name: "App",
  setup() {
    provide("store", store);
    return { store };
  },
});
...
```

### Inject the store into the child component
```ts
...
import { StoreContext } from "fluvx";

export default defineComponent({
  name: "ChildComponent",
  setup() {
    const store = inject<StoreContext<OurState>>("store");

    return { store };
  },
});
...
```

## License

MIT

Copyright (c) 2021-present Carlos Chao

## Keyworks

stage manager, vue 3, vue, reactivity, vuex, composable





