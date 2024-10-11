import React from "react";
import styles from './InputText.module.scss'

interface InputTextProps {
  value: string,
  onChange: (text: string) => void,
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  placeholder: string
}

const InputText: React.FC<InputTextProps> = ({ value, onChange, handleKeyDown, placeholder }) => {
  return (
    <input
      className={styles.inputCommon}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputText;
