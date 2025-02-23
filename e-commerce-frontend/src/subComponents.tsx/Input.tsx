import { validations } from '../utils/validations/validationRules';

function Input({ field, id, type, value, setValue, error, setError }: InputProps) {
  /**
   * handle error of each input field if a error is presnt
   * @param value 
   * @param id 
   */
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
    <div className={`relative mb-8 ${id === "password" ? "space-y-2" : ""}`}>
      <input
        className="w-[90%] p-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-800 font-medium text-lg focus:outline-none"
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          checkError(e.target.value, id);
        }}
        type={type}
        placeholder={`Enter your ${field}`}
      />
      {error && <div className={` ${type==="password"?"":"absolute"} pl-5 text-red-500 text-sm mt-1`}>{error}</div>}
    </div>
  );
}

export default Input;

