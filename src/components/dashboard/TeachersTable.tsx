import { Ban, Check, CreditCard, Presentation, Trash2, UserPlus } from "lucide-react";
import type { Teacher } from "../AdminDashboard";
import { NbButton } from "../ui/NbButton";

export function TeachersTable({
  teachers,
  onAdd,
  onToggle,
  onDelete,
}: {
  teachers: Teacher[];
  onAdd: () => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <section
      className="bg-white border-[3px] border-nb-ink rounded-lg shadow-nb animate-fade-up"
      style={{ animationDelay: "80ms" }}
    >
      <div className="p-5 sm:p-7 border-b-[3px] border-nb-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-black flex items-center gap-2">
            <Presentation className="w-5 h-5 text-nb-blue" strokeWidth={2.5} aria-hidden="true" />
            قائمة المدرسين والمسارات النشطة
          </h2>
          <p className="text-xs font-medium text-neutral-600 mt-1 leading-relaxed">
            متابعة عدد الكروت المسجلة لكل مدرس، وحالة تفعيل الحسابات والروابط المخصصة.
          </p>
        </div>
        <NbButton variant="green" onClick={onAdd} className="w-full sm:w-auto whitespace-nowrap">
          <UserPlus className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          إضافة مدرس جديد
        </NbButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm min-w-[760px]">
          <thead>
            <tr className="bg-nb-muted border-b-[3px] border-nb-ink text-xs">
              <th className="py-4 px-5 font-black">اسم المدرس</th>
              <th className="py-4 px-5 font-black">المادة الدراسية</th>
              <th className="py-4 px-5 font-black">لينك الموقع (Slug)</th>
              <th className="py-4 px-5 font-black">الكروت المسجلة</th>
              <th className="py-4 px-5 font-black">حالة الحساب</th>
              <th className="py-4 px-5 font-black text-center">الإجراءات والتحكم</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 font-bold text-neutral-500">
                  لا يوجد مدرسين مضافين حاليًا.
                </td>
              </tr>
            ) : (
              teachers.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b-2 border-nb-ink last:border-b-0 ${t.active ? "" : "opacity-60"}`}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-md bg-nb-yellow border-2 border-nb-ink flex items-center justify-center font-black text-xs">
                        {t.name.charAt(0)}
                      </div>
                      <span className="font-bold">{t.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-medium text-neutral-700">{t.subject}</td>
                  <td className="py-4 px-5 font-mono text-xs font-semibold text-nb-blue" dir="ltr">
                    {t.link}
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-nb-blue text-white border-2 border-nb-ink px-2.5 py-1 text-xs font-black shadow-nb-xs">
                      <CreditCard className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                      {t.cardsCount} كارت
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-nb-ink px-3 py-1 text-xs font-black text-white ${
                        t.active ? "bg-nb-green" : "bg-nb-red"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-white ${t.active ? "animate-pulse" : ""}`}
                        aria-hidden="true"
                      ></span>
                      {t.active ? "مفعل نشط" : "حساب موقوف"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-center gap-2">
                      <NbButton
                        size="sm"
                        variant={t.active ? "yellow" : "green"}
                        onClick={() => onToggle(t.id)}
                        title={t.active ? "إيقاف الحساب" : "تشغيل الحساب"}
                        className="whitespace-nowrap"
                      >
                        {t.active ? (
                          <Ban className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                        ) : (
                          <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                        )}
                        {t.active ? "إيقاف" : "تشغيل"}
                      </NbButton>
                      <NbButton
                        size="sm"
                        variant="red"
                        onClick={() => onDelete(t.id)}
                        title="حذف المدرس نهائيًا"
                        className="whitespace-nowrap"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                        حذف
                      </NbButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
