import { isEmpty, isPromise } from "../../../src/util";

describe("Test Utils Functions", function() {
  test("Test IsPromise Function", () => {
    const promise = Promise.resolve();
    expect(isPromise(promise)).toBe(true);
  });

  test("Test IsPromise Function with not promise function", () => {
    const promise = () => "Promise";
    expect(isPromise(promise)).toBe(false);
  });

  test("Test isEmpty function", () => {
    const a = null;
    const b = {};
    const c = { prop: false };
    expect(isEmpty(a)).toBe(true);
    expect(isEmpty(b)).toBe(true);
    expect(isEmpty(c)).toBe(false);
  });
});
