import React, {useState, useEffect} from 'react';
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SearchTodo from "./components/SearchTodo";
import styles from './styles/App.module.scss'

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={styles.App}>
      <div className={styles.menu}>
        <button className={styles.themesBtn} onClick={toggleTheme}>Switch theme</button>
      </div>
      {/*<SearchTodo />*/}
      <TodoList />
    </div>
  );
}

export default App;
