import {
  DashboardMetrics,
  Order,
  OrderFilters,
  OrderTableRow,
  SalesByStatus,
} from "@/types/order.types";
import {
  applyDiscount,
  filterByStatus,
  groupAndCount,
  safeDivide,
} from "@/utils/functional.helpers";

// PURE FUNCTION: formatea montos para la UI sin modificar datos de entrada.
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);

// PURE FUNCTION: transforma fecha ISO a formato legible en espanol.
export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

// FILTER: filtra órdenes por estado
export const getFilteredOrders = (orders: Order[], filters: OrderFilters): Order[] => {
  const withStatus = filterByStatus(filters.status)(orders);
  const query = filters.search.trim().toLowerCase();

  return query.length === 0
    ? withStatus
    : withStatus.filter((order) => {
        const haystack = `${order.customer} ${order.city} ${order.id}`.toLowerCase();
        return haystack.includes(query);
      });
};

// REDUCE + FILTER + MAP: calcula metricas globales para toma de decisiones.
export const getDashboardMetrics = (orders: Order[]): DashboardMetrics => {
  const totalSales = orders.reduce((accumulator, order) => accumulator + order.total, 0);

  const paidOrders = orders.filter((order) => order.status === "Pagado").length;
  const pendingOrders = orders.filter((order) => order.status === "Pendiente").length;

  const cityCounts = groupAndCount(orders.map((order) => order.city));
  const topCity =
    Object.entries(cityCounts).sort((first, second) => second[1] - first[1])[0]?.[0] ?? "Sin datos";

  return {
    totalSales,
    orderCount: orders.length,
    paidOrders,
    pendingOrders,
    averageTicket: safeDivide(totalSales, orders.length),
    topCity,
  };
};

// REDUCE + MAP: resume cantidad y total vendido por estado.
export const getSalesByStatus = (orders: Order[]): SalesByStatus[] => {
  const statusTotals = orders.reduce<Record<string, { count: number; total: number }>>(
    (accumulator, order) => ({
      ...accumulator,
      [order.status]: {
        count: (accumulator[order.status]?.count ?? 0) + 1,
        total: (accumulator[order.status]?.total ?? 0) + order.total,
      },
    }),
    {}
  );

  return Object.entries(statusTotals)
    .map(([status, values]) => ({
      status: status as SalesByStatus["status"],
      count: values.count,
      total: values.total,
    }))
    .sort((first, second) => second.total - first.total);
};

// MAP + REDUCE + CURRYING: adapta pedidos a filas de tabla con descuento e impuesto.
export const mapOrdersToRows = (
  orders: Order[],
  discountPercentage: number,
  taxPercentage: number
): OrderTableRow[] => {
  const withDiscount = applyDiscount(discountPercentage);

  return orders.map((order) => {
    const itemCount = order.items.reduce((accumulator, item) => accumulator + item.quantity, 0);
    const afterDiscount = withDiscount(order.total);
    const discountedTotal = Number((afterDiscount * (1 + taxPercentage / 100)).toFixed(2));

    return {
      id: order.id,
      customer: order.customer,
      city: order.city,
      status: order.status,
      paymentMethod: order.paymentMethod,
      date: order.date,
      total: order.total,
      discountedTotal,
      itemCount,
    };
  });
};
