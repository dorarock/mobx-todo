import React, { useState } from 'react';
import { Priority } from "../../lib/types";
import {priorityColors, todoStore} from "../../stores/todoStore";

interface PriorityIconProps {
  id: number
  priority: Priority;
}

const PriorityIcon: React.FC<PriorityIconProps> = ({ id, priority }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fillColor = priorityColors[priority] || '#808080';

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handlePriorityChange = (newPriority: Priority) => {
    todoStore.setPriority(id, newPriority);  // Устанавливаем новый приоритет
    setIsMenuOpen(false);  // Закрываем меню после выбора
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V21L12 18L5 21Z"
          fill={fillColor}
        />
      </svg>

      {isMenuOpen && (
        <div style={styles.menu}>
          <div onClick={() => handlePriorityChange(Priority.Low)} style={styles.menuItem}>
            Low
          </div>
          <div onClick={() => handlePriorityChange(Priority.High)} style={styles.menuItem}>
            High
          </div>
          <div onClick={() => handlePriorityChange(Priority.None)} style={styles.menuItem}>
            None
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  menu: {
    position: 'absolute' as 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    padding: '4px',
  },
  menuItem: {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  }
};

export default PriorityIcon;
