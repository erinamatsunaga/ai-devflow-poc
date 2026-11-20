// 検証用の小さなドメインロジック。
// AIに「機能追加 → テスト追加 → PR」をさせる題材として使う。

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export function addTodo(todos: readonly Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (trimmed === "") {
    throw new Error("title must not be empty");
  }
  const nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  return [...todos, { id: nextId, title: trimmed, done: false }];
}

export function toggleTodo(todos: readonly Todo[], id: number): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function remaining(todos: readonly Todo[]): number {
  return todos.filter((t) => !t.done).length;
}
