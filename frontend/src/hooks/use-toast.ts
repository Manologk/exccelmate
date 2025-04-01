import { toast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
}

export function useToast() {
  return {
    toast: (message: string | ToastProps) => 
      typeof message === 'string' ? toast(message) : toast(message.title || '', {
        description: message.description
      }),
    dismiss: toast.dismiss,
    promise: toast.promise,
    error: toast.error,
    success: toast.success,
    info: toast.info,
    warning: toast.warning,
  }
} 