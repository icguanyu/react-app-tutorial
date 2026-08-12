import { useState, useMemo } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";
import type { FilterType } from "./components/TodoFilter";
import "./TodoApp.scss";
import { useCart } from "./context/CartContext";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  // Vue 對應：computed(() => ...)
  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );
  const completedCount = todos.length - activeCount;

  const { items } = useCart() as any;

  return (
    <div className="todo-app">
      <h1>Todos</h1>

      <TodoInput onAdd={addTodo} />

      {todos.length === 0 ? (
        <p className="todo-empty">No todos yet. Add one above!</p>
      ) : (
        <div className="todo-card">
          <ul className="todo-list">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
          <TodoFilter
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>
      )}

      <div>
        {items.length === 0 ? (
          <p>購物車是空的</p>
        ) : (
          <ul>
            {items.map((item: any) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.qty}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
