import React, { ChangeEvent } from "react";
import styles from "./InputField.module.css";

interface Props {
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  onInput: (value: string) => void;
}
const InputField: React.FC<Props> = ({ onInput, label, value, placeholder, id }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInput(event.target.value);
  };

  return (
    <div className={styles.inputFieldContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} placeholder={placeholder} className={styles.inputField} value={value} onChange={onChange} type="text" />
    </div>
  );
};

export default InputField;
