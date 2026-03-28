import {
  OrderFilters as OrderFiltersType,
  OrderStatus,
  PaymentMethod,
} from "@/types/order.types";

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onChange: (nextFilters: OrderFiltersType) => void;
  statuses: Array<OrderStatus | "Todos">;
  cities: string[];
  paymentMethods: Array<PaymentMethod | "Todos">;
  onReset: () => void;
}

export function OrderFilters({
  filters,
  onChange,
  statuses,
  cities,
  paymentMethods,
  onReset,
}: OrderFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Filtros visuales
          </h2>
          <p className="text-sm text-slate-600">
            Usa filtros funcionales para analizar pedidos especificos.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Buscar
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              onChange({ ...filters, search: event.target.value })
            }
            placeholder="Cliente, ciudad o ID"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estado
          </span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status: event.target.value as OrderStatus | "Todos",
              })
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ciudad
          </span>
          <select
            value={filters.city}
            onChange={(event) =>
              onChange({ ...filters, city: event.target.value })
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Metodo de pago
          </span>
          <select
            value={filters.paymentMethod}
            onChange={(event) =>
              onChange({
                ...filters,
                paymentMethod: event.target.value as PaymentMethod | "Todos",
              })
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Monto minimo
          </span>
          <input
            type="number"
            min={0}
            value={filters.minTotal}
            onChange={(event) =>
              onChange({ ...filters, minTotal: Number(event.target.value) })
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>

        <label className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Monto maximo
          </span>
          <input
            type="number"
            min={0}
            value={filters.maxTotal}
            onChange={(event) =>
              onChange({ ...filters, maxTotal: Number(event.target.value) })
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>
      </div>
    </section>
  );
}
