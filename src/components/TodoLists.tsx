import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../stores/todoStore";
import styles from '../styles/TodoLists.module.scss';
import classNames from 'classnames';
import TodoListComponent from "./TodoList";
import ButtonPurple from "./common/ButtonPurple/ButtonPurple";
import InputText from "./common/InputText/InputText";

const TodoLists: React.FC = observer(() => {
  const [listTitle, setListTitle] = useState("");

  const handleAddList = () => {
    if (listTitle) {
      todoStore.addTodoList(listTitle);
      setListTitle("");
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddList();
    }
  };

  // const handleSaveEdit = () => {
  //   todoStore.renameList(id, newTitle)
  //   setIsTitleEditing(false);
  // };

  return (
    <div className={styles.todoList}>
      <h2 className={styles.headline}>Your todo lists:</h2>

      <div className={styles.todoListContent}>
        <div className={styles.todoListContainer}>
          {todoStore.todoLists.map(list => (
            <TodoListComponent
              id={list.id}
              title={list.title}
              todos={list.todos}
            />
          ))}
        </div>

        <div className={classNames(styles.rightSide)}>
          <InputText
            value={listTitle}
            onChange={(text) => setListTitle(text)}
            handleKeyDown={handleKeyDown}
            placeholder="Add new list"
          />
          <div className={styles.btnWrapper}>
            <ButtonPurple
              btnText="Add new list"
              onClickHandle={() => {
                if (listTitle) {
                  todoStore.addTodoList(listTitle);
                  setListTitle("");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TodoLists;
