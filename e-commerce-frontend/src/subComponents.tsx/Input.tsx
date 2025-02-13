import { InputProps } from '../interface/interface'

function Input({field,id,type,value,setValue,error,setError}:InputProps) {
  return (
    <div className='input_box_container'>
        <label htmlFor='full_name'>{field} <span className="required text-red-800">*</span></label>
        <input className='input_box' id={id} value={value} onChange={(e)=>{setValue(e.target.value)}} type={type}/>
        <div className="error">{error}</div>
      </div>
  )
}

export default Input
