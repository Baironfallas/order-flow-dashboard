"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FunctionalShowcase } from "@/components/FunctionalShowcase";
import { MetricCard } from "@/components/MetricCard";
import { OrderFilters } from "@/components/OrderFilters";
import { OrderTable } from "@/components/OrderTable";
import { SalesSummary } from "@/components/SalesSummary";
import ordersData from "@/data/orders.json";
import {
  Order,
  OrderFilters as OrderFiltersType,
  OrderStatus,
  PaymentMethod,
} from "@/types/order.types";
import {
  formatCurrency,
  getDashboardMetrics,
  getFilteredOrders,
  getSalesByCategory,
  getSalesByStatus,
  mapOrdersToRows,
} from "@/utils/order.helpers";

const orders = ordersData as Order[];

const maxOrderTotal = orders.reduce(
  (accumulator, order) => Math.max(accumulator, order.total),
  0,
);

const initialFilters: OrderFiltersType = {
  status: "Todos",
  city: "Todos",
  paymentMethod: "Todos",
  search: "",
  minTotal: 0,
  maxTotal: maxOrderTotal,
};

const DISCOUNT_PERCENTAGE = 8;
const TAX_PERCENTAGE = 13;

export default function Home() {
  const [filters, setFilters] = useState<OrderFiltersType>(initialFilters);

  const statuses = useMemo<Array<OrderStatus | "Todos">>(
    () => [
      "Todos",
      ...Array.from(new Set(orders.map((order) => order.status))),
    ],
    [],
  );

  const cities = useMemo<string[]>(
    () => ["Todos", ...Array.from(new Set(orders.map((order) => order.city)))],
    [],
  );

  const paymentMethods = useMemo<Array<PaymentMethod | "Todos">>(
    () => [
      "Todos",
      ...Array.from(new Set(orders.map((order) => order.paymentMethod))),
    ],
    [],
  );

  const filteredOrders = useMemo(
    () => getFilteredOrders(orders, filters),
    [filters],
  );
  const metrics = useMemo(
    () => getDashboardMetrics(filteredOrders),
    [filteredOrders],
  );

  const tableRows = useMemo(
    () => mapOrdersToRows(filteredOrders, DISCOUNT_PERCENTAGE, TAX_PERCENTAGE),
    [filteredOrders],
  );

  const salesByStatus = useMemo(
    () => getSalesByStatus(filteredOrders),
    [filteredOrders],
  );
  const salesByCategory = useMemo(
    () => getSalesByCategory(filteredOrders),
    [filteredOrders],
  );

  const discountedPreview = useMemo(() => {
    const sample = tableRows[0];
    return sample ? formatCurrency(sample.discountedTotal) : "Sin datos";
  }, [tableRows]);

  return (
    <div className="relative flex flex-1 justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-16 h-32 w-32 rounded-full bg-emerald-300/25 blur-2xl" />
        <div className="absolute right-[12%] top-32 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <main className="w-full max-w-7xl space-y-6 animate-rise-in">
        <DashboardHeader orderCount={orders.length} />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            label="Total de ventas"
            value={formatCurrency(metrics.totalSales)}
            hint="Suma de pedidos filtrados"
            icon={<TrendUpIcon />}
          />
          <MetricCard
            label="Cantidad de pedidos"
            value={String(metrics.orderCount)}
            hint="Pedidos visibles en el analisis"
            icon={<BoxIcon />}
          />
          <MetricCard
            label="Pedidos pagados"
            value={String(metrics.paidOrders)}
            hint="Cobro confirmado"
            icon={<CheckIcon />}
          />
          <MetricCard
            label="Pedidos pendientes"
            value={String(metrics.pendingOrders)}
            hint="Requieren seguimiento"
            icon={<ClockIcon />}
          />
          <MetricCard
            label="Ticket promedio"
            value={formatCurrency(metrics.averageTicket)}
            hint="Promedio por pedido"
            icon={<CardIcon />}
          />
          <MetricCard
            label="Ciudad con mas pedidos"
            value={metrics.topCity}
            hint="Mayor concentracion de demanda"
            icon={<PinIcon />}
          />
        </section>

        <OrderFilters
          filters={filters}
          onChange={setFilters}
          statuses={statuses}
          cities={cities}
          paymentMethods={paymentMethods}
          onReset={() => setFilters(initialFilters)}
        />

        <OrderTable rows={tableRows} />

        <SalesSummary byStatus={salesByStatus} byCategory={salesByCategory} />

        <FunctionalShowcase
          visibleCount={tableRows.length}
          discountedPreview={discountedPreview}
        />
      </main>
    </div>
  );
}

function TrendUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 16l6-6 4 4 6-6" />
      <path d="M14 8h6v6" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 7L10 17l-5-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
