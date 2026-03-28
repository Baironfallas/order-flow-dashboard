import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
}

export function MetricCard({ label, value, hint, icon }: MetricCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_35px_-28px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_42px_-26px_rgba(15,23,42,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
          <p className="mt-1 text-sm text-slate-600">{hint}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
          {icon}
        </div>
      </div>
    </article>
  );
}
