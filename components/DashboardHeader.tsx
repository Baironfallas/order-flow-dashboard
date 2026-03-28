interface DashboardHeaderProps {
  orderCount: number;
}

export function DashboardHeader({ orderCount }: DashboardHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.55)] backdrop-blur">
      <div className="absolute -top-14 -right-12 h-40 w-40 rounded-full bg-emerald-300/25 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-blue-300/20 blur-2xl" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Order Intelligence
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            OrderFlow Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            Visualiza estado de pedidos, ventas y oportunidades de mejora para
            tomar decisiones operativas en tiempo real.
          </p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto md:min-w-72">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Pedidos cargados
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {orderCount}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Periodo analizado
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-900">
              Marzo 2026
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
