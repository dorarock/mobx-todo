import {autorun, makeAutoObservable} from "mobx";
import {Priority, Todo, TodoList} from "../lib/types";

export const priorityColors: { [key in Priority]: string } = {
  [Priority.Low]: '#00FF00',     // Зеленый цвет для Low
  [Priority.High]: '#FF0000',    // Красный цвет для High
  [Priority.None]: '#808080'     // Серый цвет для неопределенного приоритета
};

const lists = [
  {
    "id": 1728487694111,
    "title": "Personal List",
    "todos": [
      {
        "id": 1728487700302,
        "title": "Eat",
        "completed": true,
        "priority": Priority.High
      },
      {
        "id": 1728487704663,
        "title": "Sleap",
        "completed": false,
        "priority": null
      },
      {
        "id": 1728487707545,
        "title": "Repeat",
        "completed": false,
        "priority": null
      }
    ]
  }
]

export const createTodoStore = () => {
  const store = makeAutoObservable({
    todoLists: lists as TodoList[],
    currentListId: null as number | null,
    searchTerm: "",

    setSearchTerm(term:string) {
      this.searchTerm = term;
    },

    addTodoList(title: string) {
      const newList: TodoList = {
        id: Date.now(),
        title,
        todos: []
      };
      this.todoLists.push(newList);
      this.currentListId = newList.id; // Установить текущий список на только что добавленный
    },

    getCurrentList() {
      return this.todoLists.find((list: TodoList) => list.id === this.currentListId);
    },

    removeTodoList(id: number) {
      this.todoLists = this.todoLists.filter((list: TodoList) => list.id !== id);
      if (this.currentListId === id) {
        this.currentListId = null; // Если удаляем текущий список, сбрасываем его
      }
    },

    //TODO: add renaming of the list

    // renameList(id:number, newTitle:string) {
    //   const currentList = this.todoLists.find((list: TodoList) => list.id === id);
    //   if (currentList) {
    //     currentList.title = newTitle
    //   }
    // },

    completeCount(listId: number) {
      const list = this.todoLists.find((list: TodoList) => list.id === listId);
      return list ? list.todos.filter((el: Todo) => el.completed).length : 0
    },

    inCompleteCount(listId: number) {
      const list = this.todoLists.find((list: TodoList) => list.id === listId);
      return list ? list.todos.filter((el: Todo) => !el.completed).length : 0
    },

    addTodo(title: string) {
      const currentList = this.getCurrentList();
      if (currentList) {
        const newTodo: Todo = {
          id: Date.now(),
          title,
          completed: false,
          priority: Priority.None
        };
        currentList.todos.push(newTodo);
        // currentList.todos = currentList.todos.slice().sort((a, b) => a.title.localeCompare(b.title));
      }
    },

    removeTodo(id: number) {
      const currentList = this.getCurrentList();
      if (currentList) {
        currentList.todos = currentList.todos.filter((todo: Todo) => todo.id !== id);
      }
    },

    editTodo(listId: number, id: number, newTitle: string) {
      if (!newTitle.trim()) {
        console.error("New title cannot be empty");
        return;
      }

      const list = this.todoLists.find((list: TodoList) => list.id === listId);
      if (!list) {
        console.error(`List with ID ${listId} not found`);
        return;
      }

      const listTodo = list.todos.find((todo: Todo) => todo.id === id);
      if (!listTodo) {
        console.error(`Todo with ID ${id} not found in list ${listId}`);
        return;
      }

      listTodo.title = newTitle;
    },

    toggleTodo(id: number) {
      const currentList = this.getCurrentList();
      if (currentList) {
        const todo = currentList.todos.find((todo: Todo) => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    },

    setPriority(id: number, newPriority: Priority): void {
      const currentList = this.getCurrentList();
      if (currentList) {
        const todo = currentList.todos.find((todo: Todo) => todo.id === id);
        if (todo) {
          todo.priority = newPriority;
        }
      }
    },

    // // Новая функция поиска по всем листам
    // searchTodos() {
    //   if (!this.searchTerm) {
    //     return this.todoLists;
    //   }
    //
    //   // Возвращаем только листы с совпадениями
    //   this.todoLists = this.todoLists
    //     .map(list => ({
    //       ...list,
    //       todos: list.todos.filter(todo =>
    //         todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    //       )
    //     }))
    //     .filter(list => list.todos.length > 0)
    // },

    get filteredTodos() {
      const currentList = this.getCurrentList();
      return currentList ? currentList.todos : [];
    },

    get completedTodos() {
      return this.filteredTodos.filter((todo: Todo) => todo.completed);
    },

    get incompleteTodos() {
      return this.filteredTodos.filter((todo: Todo) => !todo.completed);
    }
  });

  autorun(() => {
    console.log("Current todo lists:", store.todoLists.map((list: TodoList) => list.todos));
  });

  return store;
};

export const todoStore = createTodoStore();
