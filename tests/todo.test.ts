import { describe, expect, it } from "vitest";
import { addTodo, remaining, toggleTodo } from "../src/todo";

describe("addTodo", () => {
  it("adds a trimmed todo with incremented id", () => {
    const a = addTodo([], "  買い物  ");
    const b = addTodo(a, "掃除");
    expect(b).toEqual([
      { id: 1, title: "買い物", done: false },
      { id: 2, title: "掃除", done: false },
    ]);
  });

  it("rejects empty titles", () => {
    expect(() => addTodo([], "   ")).toThrow();
  });
});

describe("toggleTodo / remaining", () => {
  it("toggles done and counts remaining", () => {
    const todos = addTodo(addTodo([], "a"), "b");
    const toggled = toggleTodo(todos, 1);
    expect(toggled[0]!.done).toBe(true);
    expect(remaining(toggled)).toBe(1);
  });
});
