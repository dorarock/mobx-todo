import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { todoStore } from "../stores/todoStore";
import TodoItem from "./TodoItem";
import styles from '../styles/TodoList.module.scss';
import classNames from 'classnames';
import {Todo, TodoList} from "../lib/types";
import InputText from "./common/InputText/InputText";
import ButtonPurple from "./common/ButtonPurple/ButtonPurple";

const TodoListComponent: React.FC<TodoList> = observer(({ id, title, todos }) => {
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState('');

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

  // const handleSaveEdit = () => {
  //   todoStore.renameList(id, newTitle)
  //   setIsTitleEditing(false);
  // };

  return (
    <div className={styles.list} key={id.toString()}>
      <div className={classNames(styles.flexContainer, styles.headlineWrapper)}>
        <h3 className={styles.smallHeadline}>{title}</h3>
        <div className={styles.buttonsContainer}>
          <button onClick={() => todoStore.currentListId = id}>Open | </button>
          <button onClick={() => todoStore.removeTodoList(id)}>Remove</button>
          {/*<button onClick={() => todoStore.removeTodoList(list.id)}>Rename List</button>*/}
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <button className={filter === 'all' ? styles.filterActive : ''} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={filter === 'completed' ? styles.filterActive : ''} onClick={() => setFilter("completed")}>
          Completed
          <span className={styles.counter}>{todoStore.completeCount(id)}</span>
        </button>
        <button className={filter === 'incomplete' ? styles.filterActive : ''} onClick={() => setFilter("incomplete")}>
          Incomplete
          <span className={styles.counter}>{todoStore.inCompleteCount(id)}</span>
        </button>
      </div>
      {todoStore.currentListId === id && (
        <div>
          <div className={styles.flexContainer}>
            <InputText
              value={newTodo}
              onChange={(text) => {setNewTodo(text)}}
              handleKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  todoStore.addTodo(e.currentTarget.value);
                  e.currentTarget.value = "";
                  setNewTodo("")
                }
              }}
              placeholder="Add new todo"
            />
            <div className={styles.btnWrapper}>
              <ButtonPurple
                onClickHandle={() => {
                if (newTodo) {
                  todoStore.addTodo(newTodo)
                }
              }}
                btnText="+"
              />
            </div>
          </div>
          <ul>
            {getTodosToDisplay().length === 0 ? (
              <li>No tasks found</li>
            ) : (
              getTodosToDisplay().map((todo: Todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  listId={id}
                  title={todo.title}
                  completed={todo.completed}
                  priority={todo.priority}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
});

export default TodoListComponent;
