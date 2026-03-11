import { useState } from "react";

// TodoForm = input + button to add a new task.
export default function TodoForm({ onAddTodo, disabled }) {
  // This state stores what the user is currently typing.
  const [text, setText] = useState("");

  // Runs when the form is submitted.
  function handleSubmit(event) {
    event.preventDefault(); // prevents the page from refreshing

    const trimmed = text.trim();
    if (!trimmed) return; 

    // Call the function from App to add the todo.
    onAddTodo(trimmed);

    // Clear the input box.
    setText("");
  }

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder={disabled ? "Finish editing before adding a new task..." : "Enter a new task..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />

      <button className="button" type="submit" disabled={disabled}>
        Add
      </button>
    </form>
  );
}

