import { Order, OrderStatus } from "@/types/order.types";


// 1. CURRYING: Función con dos niveles
export const applyDiscount =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 - percentage / 100)).toFixed(2));


// 2. PURE FUNCTION: Evita efectos secundarios
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));


// 3. FILTER: Filtra con condición

export const filterByStatus =
  (status: OrderStatus | "Todos") =>
  (orders: Order[]): Order[] =>
    status === "Todos" ? orders : orders.filter((order) => order.status === status);

// 4. MAP: Transforma cada elemento del arreglo
export const mapOrderToTotals = (orders: Order[]): number[] =>
  orders.map((order) => order.total);


// 5. REDUCE: Acumula valores en una sola pasada
export const groupAndCount = <T extends string | number>(values: T[]): Record<T, number> =>
  values.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: (accumulator[value] ?? 0) + 1,
    }),
    {} as Record<T, number>
  );
