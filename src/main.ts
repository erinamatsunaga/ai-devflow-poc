import "./style.css";
import { addTodo, remaining, toggleTodo, type Todo } from "./todo";

let todos: Todo[] = [];

const app = document.querySelector<HTMLElement>("#app")!;

app.innerHTML = `
  <h1>AI DevFlow PoC</h1>
  <p class="meta">build: <code>${import.meta.env.MODE}</code> / ${__BUILD_TIME__}</p>
  <form id="form">
    <input id="title" placeholder="やること" autocomplete="off" />
    <button type="submit">追加</button>
  </form>
  <ul id="list"></ul>
  <p id="count"></p>
`;

const form = app.querySelector<HTMLFormElement>("#form")!;
const input = app.querySelector<HTMLInputElement>("#title")!;
const list = app.querySelector<HTMLUListElement>("#list")!;
const count = app.querySelector<HTMLParagraphElement>("#count")!;

function render(): void {
  list.innerHTML = "";
  for (const t of todos) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.addEventListener("change", () => {
      todos = toggleTodo(todos, t.id);
      render();
    });
    label.append(cb, ` ${t.title}`);
    if (t.done) li.classList.add("done");
    li.append(label);
    list.append(li);
  }
  count.textContent = `残り ${remaining(todos)} 件`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    todos = addTodo(todos, input.value);
    input.value = "";
    render();
  } catch {
    input.focus();
  }
});

render();
