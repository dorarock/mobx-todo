import React, { useState } from "react";
import { todoStore } from "../stores/todoStore";
import styles from '../styles/TodoItem.module.scss';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // TODO: дописать изменение текста тудушки
  const handleSaveEdit = () => {
    todoStore.editTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <li>
      <div className={styles.note}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => todoStore.toggleTodo(id)}
        />

        {isEditing ? (
          <>
            <input
              className={styles.editInput}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <span style={{ textDecoration: completed ? "line-through" : "none" }}>
            {title}
          </span>
        )}
      </div>

      <div className={styles.btnContainer}>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => todoStore.removeTodo(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
