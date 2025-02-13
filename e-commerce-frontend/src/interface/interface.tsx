export interface InputProps {
    field: string;
    id: string;
    type: string,
    value: string;
    setValue: (value:string)=>void;
    error: string;
    setError: (value:string)=>void;
}