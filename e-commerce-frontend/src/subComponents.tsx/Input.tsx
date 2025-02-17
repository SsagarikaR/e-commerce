import { validations } from '../utils/validations/validationRules';

function Input({ field, id, type, value, setValue, error, setError }: InputProps) {
  function checkError(value: string, id: string) {
    for (const key in validations[id]) {
      if (validations[id][key].logic(value)) {
        setError(validations[id][key].message);
        break;
      } else {
        setError("");
      }
    }
  }

  return (
    <div className={`input_box_container ${id === "password" ? "password-container" : ""}`}>
      <input
        className="input_box"
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          checkError(e.target.value, id);
        }}
        type={type}
        placeholder={`Enter your ${field}`}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Input;
