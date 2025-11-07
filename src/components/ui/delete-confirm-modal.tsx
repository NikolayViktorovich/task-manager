import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
import { Button } from './button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description = "Это действие нельзя отменить.",
  confirmText = "Удалить",
  cancelText = "Отмена"
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 shadow-corporate-lg border-0">
        <DialogHeader className="flex flex-row items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <DialogTitle className="text-white text-lg">
              {title}
            </DialogTitle>
            <DialogDescription className="text-gray-400 mt-1">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <DialogFooter className="flex gap-3 justify-end mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {cancelText}
          </Button>
          <Button 
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}