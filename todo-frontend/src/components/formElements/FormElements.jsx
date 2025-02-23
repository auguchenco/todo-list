import styles from "./formElements.styles.module.scss";

export const Input = ({ input }) => {
  return (
    <div className={styles.inputContainer}>
      {!input.noLabel && <label htmlFor={input.id}>{input.text}</label>}
      <input
        type={input.type}
        id={input.id}
        name={input.id}
        placeholder={input.placeholder}
        defaultValue={input.defaultValue}
      />
    </div>
  );
};

export const Button = ({ button }) => {
  return (
    <button
      type={button.type}
      id={button.id}
      className={button.className}
      onClick={button.onClick}
    >
      {button.text}
    </button>
  );
};
