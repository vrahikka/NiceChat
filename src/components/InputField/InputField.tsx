import React, { ChangeEvent } from "react";
import styles from "./InputField.module.css";

interface Props {
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  textArea?: boolean;
  onInput: (value: string) => void;
}
const InputField: React.FC<Props> = ({ onInput, label, value, placeholder, id, textArea }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    onInput(event.target.value);
  };

  return (
    <div className={styles.inputFieldContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      {textArea ? (
        <textarea id={id} placeholder={placeholder} className={styles.textArea} value={value} rows={3} onChange={onChange} />
      ) : (
        <input id={id} placeholder={placeholder} className={styles.inputField} value={value} onChange={onChange} type="text" />
      )}
    </div>
  );
};

export default InputField;
