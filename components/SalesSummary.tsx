import { SalesByCategory, SalesByStatus } from "@/types/order.types";
import { formatCurrency } from "@/utils/order.helpers";

interface SalesSummaryProps {
  byStatus: SalesByStatus[];
  byCategory: SalesByCategory[];
}

export function SalesSummary({ byStatus, byCategory }: SalesSummaryProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)]">
        <h3 className="text-base font-semibold text-slate-900">
          Ventas por estado (reduce)
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Conteo y ventas agregadas sin mutar la data original.
        </p>

        <div className="mt-4 space-y-3">
          {byStatus.map((status) => (
            <div
              key={status.status}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-800">{status.status}</p>
                <p className="text-sm text-slate-600">{status.count} pedidos</p>
              </div>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {formatCurrency(status.total)}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)]">
        <h3 className="text-base font-semibold text-slate-900">
          Categorias mas rentables
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Resumen por categoria usando flatMap + reduce.
        </p>

        <div className="mt-4 space-y-3">
          {byCategory.map((category) => (
            <div
              key={category.category}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-800">
                  {category.category}
                </p>
                <p className="text-sm text-slate-600">
                  {category.units} unidades
                </p>
              </div>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {formatCurrency(category.total)}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
