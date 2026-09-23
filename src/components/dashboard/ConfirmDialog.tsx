import { Trash2 } from "lucide-react";
import { NbButton } from "../ui/NbButton";

export function ConfirmDialog({
  open,
  teacherName,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  teacherName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-nb-ink/60 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="تأكيد الحذف"
        className="w-full max-w-sm bg-white border-[3px] border-nb-ink rounded-lg shadow-nb-lg p-6 text-center animate-fade-up"
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-nb-red border-[3px] border-nb-ink flex items-center justify-center">
          <Trash2 className="w-6 h-6 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-black mb-2">تأكيد الحذف</h3>
        <p className="text-sm font-medium text-neutral-600 leading-relaxed mb-6">
          متأكد إنك عايز تحذف <span className="font-black text-nb-ink">{teacherName}</span> نهائيًا من
          المنصة؟ الخطوة دي مش بترجع تاني.
        </p>
        <div className="flex justify-center gap-3">
          <NbButton variant="paper" onClick={onCancel} className="px-5 py-2.5">
            رجوع
          </NbButton>
          <NbButton variant="red" onClick={onConfirm} className="px-5 py-2.5">
            حذف نهائي
          </NbButton>
        </div>
      </div>
    </div>
  );
}
