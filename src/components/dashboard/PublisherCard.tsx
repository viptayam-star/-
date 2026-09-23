"use client";

import { useState } from "react";
import { MessageSquareText, Send } from "lucide-react";
import { NbButton } from "../ui/NbButton";

export function PublisherCard({ onPublish }: { onPublish: (text: string) => boolean }) {
  const [value, setValue] = useState("");

  return (
    <section className="bg-white border-[3px] border-nb-ink rounded-lg shadow-nb p-5 sm:p-7 animate-fade-up">
      <div className="flex items-start sm:items-center gap-3 mb-5">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-nb-blue border-[3px] border-nb-ink flex items-center justify-center">
          <MessageSquareText className="w-5 h-5 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-black">نشر رسالة عامة للطلاب</h2>
          <p className="text-xs font-medium text-neutral-600 leading-relaxed">
            الرسالة ستظهر فورًا في شريط الإعلانات أعلى جميع صفحات المنصات للمدرسين والطلاب.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="اكتب نص الرسالة أو التنبيه هنا..."
          className="flex-1 min-w-0 bg-white border-[3px] border-nb-ink rounded-lg px-4 py-3 text-sm font-medium placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-nb-blue focus:ring-offset-2 transition-shadow"
        />
        <NbButton
          variant="yellow"
          className="whitespace-nowrap"
          onClick={() => {
            if (onPublish(value.trim())) setValue("");
          }}
        >
          <Send className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          نشر التنبيه العام
        </NbButton>
      </div>
    </section>
  );
}
