import { OrderTableRow } from "@/types/order.types";
import { formatCurrency, formatDate } from "@/utils/order.helpers";

interface OrderTableProps {
  rows: OrderTableRow[];
}

const statusStyles: Record<OrderTableRow["status"], string> = {
  Pagado: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pendiente: "bg-amber-100 text-amber-700 border-amber-200",
  Enviado: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelado: "bg-rose-100 text-rose-700 border-rose-200",
};

export function OrderTable({ rows }: OrderTableProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)]">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tabla de pedidos
          </h2>
          <p className="text-sm text-slate-600">
            Data mapeada desde JSON local y transformada con funciones puras.
          </p>
        </div>
        <p className="text-sm text-slate-500">
          Mostrando {rows.length} registros
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-215 border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Cliente</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Ciudad</th>
              <th className="px-3 py-2">Pago</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Items</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Total desc + imp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="rounded-2xl bg-slate-50/80 text-sm text-slate-700"
              >
                <td className="rounded-l-2xl px-3 py-3 font-semibold text-slate-900">
                  #{row.id}
                </td>
                <td className="px-3 py-3">{row.customer}</td>
                <td className="px-3 py-3">{formatDate(row.date)}</td>
                <td className="px-3 py-3">{row.city}</td>
                <td className="px-3 py-3">{row.paymentMethod}</td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-3">{row.itemCount}</td>
                <td className="px-3 py-3 font-semibold text-slate-900">
                  {formatCurrency(row.total)}
                </td>
                <td className="rounded-r-2xl px-3 py-3 font-semibold text-emerald-700">
                  {formatCurrency(row.discountedTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
