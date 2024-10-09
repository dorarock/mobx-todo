import React from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../stores/todoStore";

const SearchTodo: React.FC = observer(() => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    todoStore.setSearchTerm(event.target.value); // Обновляем строку поиска в хранилище
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={todoStore.searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
});

export default SearchTodo;
