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

// 1) formatCurrency - PURE FUNCTION
// Paso 1: recibe un numero.
// Paso 2: aplica formato regional es-CR.
// Paso 3: devuelve el valor como texto de moneda CRC para mostrar en UI.
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);

// 2) formatDate - PURE FUNCTION
// Paso 1: recibe una fecha en texto (ISO sin hora).
// Paso 2: agrega hora fija para evitar ambiguedad al crear Date.
// Paso 3: devuelve la fecha en formato legible para es-CR.
export const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

// 3) getFilteredOrders - FILTER (cadena de filtros)
// Paso 1: filtra por estado usando helper funcional.
// Paso 2: normaliza el texto de busqueda.
// Paso 3: aplica busqueda por cliente, ciudad o id.
// Paso 4: aplica filtros por ciudad y metodo de pago.
// Paso 5: aplica rango de monto minimo y maximo.
export const getFilteredOrders = (orders: Order[], filters: OrderFilters): Order[] => {
  const withStatus = filterByStatus(filters.status)(orders);
  const query = filters.search.trim().toLowerCase();

  return withStatus
    .filter((order) => {
      if (query.length === 0) return true;
      const haystack = `${order.customer} ${order.city} ${order.id}`.toLowerCase();
      return haystack.includes(query);
    })
    .filter((order) => filters.city === "Todos" || order.city === filters.city)
    .filter(
      (order) =>
        filters.paymentMethod === "Todos" || order.paymentMethod === filters.paymentMethod,
    )
    .filter((order) => order.total >= filters.minTotal && order.total <= filters.maxTotal);
};

// 4) getDashboardMetrics - REDUCE + FILTER + MAP
// Paso 1: suma ventas totales.
// Paso 2: cuenta ordenes pagadas y pendientes.
// Paso 3: calcula ciudad con mayor frecuencia.
// Paso 4: arma el objeto final de metricas para el dashboard.
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

// 5) getSalesByStatus - REDUCE + MAP
// Paso 1: agrupa por estado y acumula cantidad + total vendido.
// Paso 2: convierte el objeto agrupado a arreglo para la UI.
// Paso 3: ordena de mayor a menor total para priorizar lectura.
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

// 6) mapOrdersToRows - MAP + REDUCE + CURRYING
// Paso 1: crea funcion de descuento reutilizable con currying.
// Paso 2: para cada orden, cuenta total de items.
// Paso 3: calcula total con descuento y luego aplica impuesto.
// Paso 4: devuelve cada fila con los campos listos para la tabla.
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
