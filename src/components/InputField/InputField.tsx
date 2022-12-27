import React, { ChangeEvent } from "react";
import styles from "./InputField.module.css";

interface Props {
  id: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  onInput: (value: string) => void;
}
const InputField: React.FC<Props> = ({ onInput, label, defaultValue, placeholder, id }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInput(event.target.value);
  };

  return (
    <div className={styles.inputFieldContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} placeholder={placeholder} className={styles.inputField} defaultValue={defaultValue ?? ""} onChange={onChange} type="text" />
    </div>
  );
};

export default InputField;
