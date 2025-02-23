function ModalInput({ id, value, setValue, field, error, setError }: modalInputProp) {
  /**
   * handle error of each input field if an error is present
   */
  return (
    <div>
    <div className="flex">
      <label htmlFor={id} className="font-semibold text-xl w-70 ">
        Enter {field}
      </label>
      <input
        id={id}
        className="border p-2 outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (setError) setError(""); // Clear error when the user types
        }}
      />
          </div>
          {error && <div className="text-red-500 text-sm mt-1 pl-70">{error}</div>} {/* Display error message */}

    </div>
  );
}

export default ModalInput;
