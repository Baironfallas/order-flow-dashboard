interface FunctionalShowcaseProps {
  visibleCount: number;
  discountedPreview: string;
}

export function FunctionalShowcase({
  visibleCount,
  discountedPreview,
}: FunctionalShowcaseProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.5)]">
      <h2 className="text-lg font-semibold text-slate-900">
        Programacion funcional aplicada
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Implementacion real dentro del flujo de analisis de pedidos.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">map</p>
          <p className="mt-1 text-sm text-slate-600">
            Transforma pedidos en filas de tabla y tarjetas visuales (
            {visibleCount} filas activas).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">filter</p>
          <p className="mt-1 text-sm text-slate-600">
            Filtra por estado, ciudad, metodo de pago, texto y rango de montos.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">reduce</p>
          <p className="mt-1 text-sm text-slate-600">
            Calcula ventas totales, ticket promedio y agregados por
            estado/categoria.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-semibold text-slate-800">
            currying + pure functions
          </p>
          <p className="mt-1 text-sm text-slate-600">
            applyDiscount(8)(monto) y filtros parametrizados producen resultados
            predecibles. Ejemplo: {discountedPreview}.
          </p>
        </div>
      </div>
    </section>
  );
}
