import styles from "./Button.module.css";

interface InputProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
  submit?: boolean;
}

const Button: React.FC<InputProps> = ({ text, onClick, disabled, autoFocus, submit }) => {
  const click = (event?: React.FormEvent<HTMLButtonElement>) => {
    if (event && "preventDefault" in event) {
      event.preventDefault();
    }
    onClick();
  };

  return (
    <button autoFocus={autoFocus} disabled={disabled} className={styles.button} onClick={click} type={submit ? "submit" : undefined}>
      {text}
    </button>
  );
};

export default Button;
