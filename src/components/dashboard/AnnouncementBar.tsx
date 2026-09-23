import { Megaphone } from "lucide-react";

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="bg-nb-yellow border-b-[3px] border-nb-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-3">
        <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nb-ink opacity-60"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-nb-ink"></span>
        </span>
        <Megaphone className="w-5 h-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        <p className="text-sm font-bold tracking-wide text-center">{text}</p>
      </div>
    </div>
  );
}
