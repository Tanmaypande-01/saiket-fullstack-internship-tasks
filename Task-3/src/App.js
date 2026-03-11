import { useMemo, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// App = the main parent component.
export default function App() {

  // Each todo is an object like:
  const [todos, setTodos] = useState([]);

  // This holds the current text while the user is editing a todo.
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Adds a new todo item to the list.
  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false
    };

    // Update state by creating a new array (important in React).
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  }

  // Deletes a todo by id.
  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    // If you delete the todo you are editing, exit edit mode.
    if (editingTodoId === id) {
      cancelEdit();
    }
  }

  // Toggles completed status (done / not done).
  function toggleComplete(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Starts editing a specific todo.
  function startEdit(todo) {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  }

  // Cancels edit mode and clears edit state.
  function cancelEdit() {
    setEditingTodoId(null);
    setEditingText("");
  }

  // Saves the edit (updates the todo text).
  function saveEdit(id) {
    const trimmed = editingText.trim();

    // Prevent saving empty text.
    if (!trimmed) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );

    // Exit edit mode after saving.
    cancelEdit();
  }

  // A simple "stats" section (nice for UX and easy for beginners).
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <h1 className="title">To-Do List</h1>
          <p className="subtitle">Add, edit, delete, and complete your tasks.</p>
        </header>

        <TodoForm onAddTodo={addTodo} disabled={editingTodoId !== null} />

        <div className="stats">
          <span>
            <strong>Total:</strong> {stats.total}
          </span>
          <span>
            <strong>Active:</strong> {stats.active}
          </span>
          <span>
            <strong>Completed:</strong> {stats.completed}
          </span>
        </div>

        <TodoList
          todos={todos}
          editingTodoId={editingTodoId}
          editingText={editingText}
          onEditingTextChange={setEditingText}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onSaveEdit={saveEdit}
        />
      </div>
    </div>
  );
}

