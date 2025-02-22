// src/components/useToast.ts

import { toast } from 'react-toastify';  // Assuming you're using react-toastify or a similar package

const useToast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
};

export default useToast;
