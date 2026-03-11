// TodoItem = a single row in the todo list.
export default function TodoItem({
  todo,
  isEditing,
  editingText,
  onEditingTextChange,
  onToggleComplete,
  onDeleteTodo,
  onStartEdit,
  onCancelEdit,
  onSaveEdit
}) {
  // Runs when the user clicks "Save" or presses Enter inside the edit input.
  function handleSave() {
    onSaveEdit(todo.id);
  }

  // Runs when the user presses keys while editing.
  function handleEditKeyDown(event) {
    if (event.key === "Enter") {
      handleSave();
    }

    // Escape key cancels editing (nice UX).
    if (event.key === "Escape") {
      onCancelEdit();
    }
  }

  return (
    <li className="todoItem">
      <div className="left">
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          disabled={isEditing} 
        />

        {/* If this todo is being edited, show an input.
            Otherwise, show the normal text. */}
        {isEditing ? (
          <div className="editRow">
            <input
              className="input"
              type="text"
              value={editingText}
              onChange={(e) => onEditingTextChange(e.target.value)}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
          </div>
        ) : (
          <div className={`text ${todo.completed ? "textCompleted" : ""}`}>{todo.text}</div>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button className="smallButton smallButtonPrimary" onClick={handleSave} type="button">
              Save
            </button>
            <button className="smallButton" onClick={onCancelEdit} type="button">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="smallButton"
              onClick={() => onStartEdit(todo)}
              type="button"
              disabled={todo.completed} 
              title={todo.completed ? "Completed tasks are locked" : "Edit task"}
            >
              Edit
            </button>
            <button
              className="smallButton buttonDanger"
              onClick={() => onDeleteTodo(todo.id)}
              type="button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

