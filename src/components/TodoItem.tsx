import React, {useState} from "react";
import {todoStore} from "../stores/todoStore";
import styles from '../styles/TodoItem.module.scss';
import {Priority, Todo} from "../lib/types";
import PriorityIcon from "./Icons/PriorityIcon";

export interface TodoItemProps extends Todo {
  listId: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, priority, listId  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSaveEdit = () => {
    todoStore.editTodo(listId, id, newTitle);
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
        <PriorityIcon id={id} priority={priority} />
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => todoStore.removeTodo(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
