import { makeAutoObservable, autorun } from "mobx";

enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority | null
}

interface TodoList {
  id: number;
  title: string;
  todos: Todo[];
}

export const createTodoStore = () => {
  const store = makeAutoObservable({
    todoLists: [
      {
        "id": 1728487694111,
        "title": "Personal List",
        "todos": [
          {
            "id": 1728487700302,
            "title": "Eat",
            "completed": true,
            "priority": null
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
    ] as TodoList[],
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

    addTodo(title: string) {
      const currentList = this.getCurrentList();
      if (currentList) {
        const newTodo: Todo = {
          id: Date.now(),
          title,
          completed: false,
          priority: null
        };
        currentList.todos.push(newTodo);
      }
    },

    removeTodo(id: number) {
      const currentList = this.getCurrentList();
      if (currentList) {
        currentList.todos = currentList.todos.filter((todo: Todo) => todo.id !== id);
      }
    },

    editTodo(id:number, newtitle: string) {

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

    setPriority(todo: Todo, newPriority: Priority): void {
      todo.priority = newPriority;
    },

    //TODO: add renaming of the list

    // renameList(id:number, newTitle:string) {
    //   const currentList = this.todoLists.find((list: TodoList) => list.id === id);
    //   if (currentList) {
    //     currentList.title = newTitle
    //   }
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
    console.log("Current todo lists:", store.todoLists.map((list: TodoList) => list));
  });

  return store;
};

export const todoStore = createTodoStore();
