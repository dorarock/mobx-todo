import React from "react";
import styles from './ButtonPurple.module.scss'

interface ButtonPurple {
  onClickHandle: () => void,
  btnText: string
}

const ButtonPurple: React.FC<ButtonPurple> = ({ onClickHandle, btnText }) => {
  return (
    <button
      className={styles.btnCommon}
      onClick={onClickHandle}
    >
      {btnText}
    </button>
  );
};

export default ButtonPurple;
