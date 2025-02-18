function ModalInput({id,value,setValue,field}:forModalInputProp) {
  return (
    <div className="flex">
    <label htmlFor="product_name" className="font-semibold text-xl w-70 ">
      Enter {field}
    </label>
    <input
      id={id}
      className="border p-2 outline-none"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  </div>
  )
}

export default ModalInput
