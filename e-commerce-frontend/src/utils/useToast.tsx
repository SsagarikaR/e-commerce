import { toast } from 'react-toastify'; 

const useToast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
};

export default useToast;
