import {
  DashboardMetrics,
  Order,
  OrderFilters,
  OrderTableRow,
  SalesByCategory,
  SalesByStatus,
} from "@/types/order.types";
import {
  applyTax,
  applyDiscount,
  filterByCity,
  filterByPaymentMethod,
  filterByRange,
  filterByStatus,
  groupAndCount,
  safeDivide,
} from "@/utils/functional.helpers";

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

export const getFilteredOrders = (orders: Order[], filters: OrderFilters): Order[] => {
  const withStatus = filterByStatus(filters.status)(orders);
  const withCity = filterByCity(filters.city)(withStatus);
  const withPayment = filterByPaymentMethod(filters.paymentMethod)(withCity);
  const withRange = filterByRange(filters.minTotal, filters.maxTotal)(withPayment);
  const query = filters.search.trim().toLowerCase();

  return query.length === 0
    ? withRange
    : withRange.filter((order) => {
        const haystack = `${order.customer} ${order.city} ${order.id}`.toLowerCase();
        return haystack.includes(query);
      });
};

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

export const getSalesByCategory = (orders: Order[]): SalesByCategory[] => {
  const categoryTotals = orders
    .flatMap((order) => order.items)
    .reduce<Record<string, { total: number; units: number }>>(
      (accumulator, item) => ({
        ...accumulator,
        [item.category]: {
          total: (accumulator[item.category]?.total ?? 0) + item.price * item.quantity,
          units: (accumulator[item.category]?.units ?? 0) + item.quantity,
        },
      }),
      {}
    );

  return Object.entries(categoryTotals)
    .map(([category, values]) => ({
      category,
      total: values.total,
      units: values.units,
    }))
    .sort((first, second) => second.total - first.total);
};

export const mapOrdersToRows = (
  orders: Order[],
  discountPercentage: number,
  taxPercentage: number
): OrderTableRow[] => {
  const withDiscount = applyDiscount(discountPercentage);
  const withTax = applyTax(taxPercentage);

  return orders.map((order) => {
    const itemCount = order.items.reduce((accumulator, item) => accumulator + item.quantity, 0);
    const discountedTotal = withTax(withDiscount(order.total));

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
