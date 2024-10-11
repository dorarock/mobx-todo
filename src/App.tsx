import React, {useState, useEffect} from 'react';
import TodoLists from "./components/TodoLists";
// import SearchTodo from "./components/SearchTodo";
import styles from './styles/App.module.scss'
import ButtonPurple from "./components/common/ButtonPurple/ButtonPurple";

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
        {/*<SearchTodo />*/}
        <div className={styles.themesBtn}>
          <ButtonPurple onClickHandle={toggleTheme} btnText="Switch theme" />
        </div>
      </div>
      <TodoLists />
    </div>
  );
}

export default App;
