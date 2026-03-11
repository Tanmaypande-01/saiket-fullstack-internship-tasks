import TodoItem from "./TodoItem";

// TodoList = renders the list of todo items.
export default function TodoList({
  todos,
  editingTodoId,
  editingText,
  onEditingTextChange,
  onToggleComplete,
  onDeleteTodo,
  onStartEdit,
  onCancelEdit,
  onSaveEdit
}) {
  // Show a friendly message if there are no tasks.
  if (todos.length === 0) {
    return <div className="emptyState">No tasks yet. Add one above!</div>;
  }

  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingTodoId === todo.id}
          editingText={editingText}
          onEditingTextChange={onEditingTextChange}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
        />
      ))}
    </ul>
  );
}

