import { CircleAlert, CircleCheck, Info } from "lucide-react";

export type Toast = { id: number; type: "success" | "error" | "info"; message: string };

const STYLES = {
  success: { bg: "bg-nb-green", Icon: CircleCheck },
  error: { bg: "bg-nb-red", Icon: CircleAlert },
  info: { bg: "bg-nb-blue", Icon: Info },
} as const;

export function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed top-5 left-4 right-4 sm:right-auto z-[500] flex flex-col gap-3 pointer-events-none sm:max-w-md">
      {toasts.map((t) => {
        const { bg, Icon } = STYLES[t.type];
        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-2.5 ${bg} text-white border-[3px] border-nb-ink rounded-lg shadow-nb px-4 py-3 animate-toast-in`}
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <p className="text-sm font-bold">{t.message}</p>
          </div>
        );
      })}
    </div>
  );
}
