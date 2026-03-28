import { Order, OrderStatus } from "@/types/order.types";

// CURRYING + PURE FUNCTION: crea una funcion de descuento reusable.
export const applyDiscount =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 - percentage / 100)).toFixed(2));

// CURRYING + PURE FUNCTION: crea una funcion de impuesto reusable.
export const applyTax =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 + percentage / 100)).toFixed(2));

// CURRYING + FILTER: parametriza el estado y filtra sin mutar el arreglo original.
export const filterByStatus =
  (status: OrderStatus | "Todos") =>
  (orders: Order[]): Order[] =>
    status === "Todos" ? orders : orders.filter((order) => order.status === status);

// CURRYING + FILTER: parametriza la ciudad y devuelve un nuevo arreglo filtrado.
export const filterByCity =
  (city: string) =>
  (orders: Order[]): Order[] =>
    city === "Todos" ? orders : orders.filter((order) => order.city === city);

// CURRYING + FILTER: parametriza el metodo de pago para analisis flexible.
export const filterByPaymentMethod =
  (paymentMethod: Order["paymentMethod"] | "Todos") =>
  (orders: Order[]): Order[] =>
    paymentMethod === "Todos"
      ? orders
      : orders.filter((order) => order.paymentMethod === paymentMethod);

// CURRYING + FILTER: filtra por rango de montos.
export const filterByRange =
  (min: number, max: number) =>
  (orders: Order[]): Order[] =>
    orders.filter((order) => order.total >= min && order.total <= max);

// PURE FUNCTION: evita division por cero y normaliza el resultado.
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));

// REDUCE: agrupa valores y cuenta ocurrencias en una sola pasada.
export const groupAndCount = <T extends string | number>(values: T[]): Record<T, number> =>
  values.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: (accumulator[value] ?? 0) + 1,
    }),
    {} as Record<T, number>
  );
