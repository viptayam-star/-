import { GraduationCap } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-[100] bg-nb-paper border-b-[3px] border-nb-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 shrink-0 rounded-lg bg-nb-blue border-[3px] border-nb-ink shadow-nb-sm flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black tracking-wide leading-tight truncate">
              منصة عنوان التعليمية
            </h1>
            <p className="text-xs font-bold text-nb-blue">لوحة تحكم المشرف الأساسية</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-white border-[3px] border-nb-ink rounded-lg px-3 py-2 shadow-nb-xs">
            <span
              className="w-2.5 h-2.5 rounded-full bg-nb-green border-2 border-nb-ink"
              aria-hidden="true"
            ></span>
            <span className="text-xs font-bold whitespace-nowrap">النظام يعمل بكفاءة</span>
          </div>
          <div
            className="w-10 h-10 rounded-lg bg-nb-yellow border-[3px] border-nb-ink shadow-nb-xs flex items-center justify-center font-black"
            aria-hidden="true"
          >
            أ
          </div>
        </div>
      </div>
    </header>
  );
}
