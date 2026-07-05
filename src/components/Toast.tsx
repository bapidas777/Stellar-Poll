import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, Loader2 } from "lucide-react";

interface ToastProps {
  status: { type: 'error' | 'success' | 'pending'; message: string } | null;
}

export function Toast({ status }: ToastProps) {
  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-puffy border backdrop-blur-md text-label-lg font-label-lg font-bold
            ${status.type === 'error' ? 'bg-error-container/90 text-on-error-container border-error/20' : ''}
            ${status.type === 'success' ? 'bg-primary-container/90 text-on-primary-container border-primary/20' : ''}
            ${status.type === 'pending' ? 'bg-surface-variant/90 text-on-surface-variant border-outline/20' : ''}
          `}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status.type === 'error' && <AlertCircle size={20} className="shrink-0" />}
          {status.type === 'success' && <Check size={20} className="shrink-0" />}
          {status.type === 'pending' && <Loader2 size={20} className="animate-spin shrink-0" />}
          <p title={status.message} className="max-w-[300px] truncate">{status.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
