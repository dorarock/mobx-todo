import React from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../stores/todoStore";
import InputText from "./common/InputText/InputText";

const SearchTodo: React.FC = observer(() => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log('csds')
      // todoStore.searchTodos();
    }
  };

  return (
    <div>
      <InputText
        value={todoStore.searchTerm}
        onChange={(text) => todoStore.setSearchTerm(text)}
        handleKeyDown={handleKeyDown}
        placeholder="Search tasks..."
      />
    </div>
  );
});

export default SearchTodo;
