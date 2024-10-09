import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Todo, todoStore } from "../stores/todoStore";
import TodoItem from "./TodoItem";
import styles from '../styles/TodoList.module.scss';
import classNames from 'classnames';

const TodoList: React.FC = observer(() => {
  const [listTitle, setListTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const getTodosToDisplay = () => {
    switch (filter) {
      case "completed":
        return todoStore.completedTodos;
      case "incomplete":
        return todoStore.incompleteTodos;
      default:
        return todoStore.filteredTodos;
    }
  };

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

      <div className={styles.flexContainer}>
        <input
          className={styles.inputCommon}
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Add new list"
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.btnCommon}
          onClick={() => {
          if (listTitle) {
            todoStore.addTodoList(listTitle);
            setListTitle("");
          }
        }}>
          +
        </button>
      </div>

      <div className={styles.todoListContainer}>
        {todoStore.todoLists.map(list => (
          <div className={styles.list} key={list.id}>
            <div className={classNames(styles.flexContainer, styles.headlineWrapper)}>
              <h3 className={styles.smallHeadline}>{list.title}</h3>
              <div className={styles.buttonsContainer}>
                <button onClick={() => todoStore.currentListId = list.id}>Open</button>
                <button onClick={() => todoStore.removeTodoList(list.id)}>Remove List</button>
                {/*<button onClick={() => todoStore.removeTodoList(list.id)}>Rename List</button>*/}
              </div>
            </div>
            {todoStore.currentListId === list.id && (
              <div>
                <div className={styles.buttonsContainer}>
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("completed")}>Completed</button>
                  <button onClick={() => setFilter("incomplete")}>Incomplete</button>
                </div>
                <input
                  className={classNames(styles.inputCommon)}
                  type="text"
                  placeholder="Add new todo"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      todoStore.addTodo(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <ul>
                  {getTodosToDisplay().length === 0 ? (
                    <li>No tasks found</li>
                  ) : (
                    getTodosToDisplay().map((todo: Todo) => (
                      <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                      />
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TodoList;
