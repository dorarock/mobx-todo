import React, { useState } from "react";
import { todoStore } from "../stores/todoStore";

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    if (title.trim()) {
      todoStore.addTodo(title);
      setTitle("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo(); // Вызываем функцию добавления задачи при нажатии Enter
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
