"use client";

import { UserPlus, X } from "lucide-react";
import { NbButton } from "../ui/NbButton";

export type TeacherForm = { name: string; subject: string; link: string };

export function AddTeacherModal({
  form,
  onChange,
  onClose,
  onSave,
}: {
  form: TeacherForm;
  onChange: (form: TeacherForm) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[300] bg-nb-ink/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="إضافة مدرس جديد للمنصة"
        className="w-full max-w-md bg-white border-[3px] border-nb-ink rounded-lg shadow-nb-lg animate-fade-up max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 p-5 border-b-[3px] border-nb-ink">
          <h3 className="text-base font-black flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-nb-blue" strokeWidth={2.5} aria-hidden="true" />
            إضافة مدرس جديد للمنصة
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-9 h-9 shrink-0 cursor-pointer rounded-lg bg-white border-[3px] border-nb-ink shadow-nb-xs flex items-center justify-center transition-all duration-200 hover:bg-nb-muted active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <X className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <Field
            label="اسم المدرس الرباعي أو اللقب"
            value={form.name}
            onChange={(v) => onChange({ ...form, name: v })}
            placeholder="مثال: أ. محمد عبد الله"
          />
          <Field
            label="المادة الدراسية"
            value={form.subject}
            onChange={(v) => onChange({ ...form, subject: v })}
            placeholder="مثال: الفيزياء والتطبيقات الحديثة"
          />
          <Field
            label="رابط الموقع المخصص (Slug)"
            value={form.link}
            onChange={(v) => onChange({ ...form, link: v })}
            placeholder="مثال: /teachers/mohamed-abdullah"
            dir="ltr"
            mono
          />
        </div>

        <div className="p-5 pt-0 flex justify-end gap-3">
          <NbButton variant="paper" onClick={onClose} className="px-5 py-2.5">
            إلغاء
          </NbButton>
          <NbButton variant="blue" onClick={onSave} className="px-6 py-2.5">
            حفظ البيانات
          </NbButton>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  dir,
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-neutral-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border-[3px] border-nb-ink rounded-lg px-4 py-3 text-sm font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-nb-blue focus:ring-offset-2 transition-shadow ${
          mono ? "font-mono text-left" : ""
        }`}
      />
    </div>
  );
}
