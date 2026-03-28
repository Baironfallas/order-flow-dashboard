import { Order, OrderStatus } from "@/types/order.types";

export const applyDiscount =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 - percentage / 100)).toFixed(2));

export const applyTax =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 + percentage / 100)).toFixed(2));

export const filterByStatus =
  (status: OrderStatus | "Todos") =>
  (orders: Order[]): Order[] =>
    status === "Todos" ? orders : orders.filter((order) => order.status === status);

export const filterByCity =
  (city: string) =>
  (orders: Order[]): Order[] =>
    city === "Todos" ? orders : orders.filter((order) => order.city === city);

export const filterByPaymentMethod =
  (paymentMethod: Order["paymentMethod"] | "Todos") =>
  (orders: Order[]): Order[] =>
    paymentMethod === "Todos"
      ? orders
      : orders.filter((order) => order.paymentMethod === paymentMethod);

export const filterByRange =
  (min: number, max: number) =>
  (orders: Order[]): Order[] =>
    orders.filter((order) => order.total >= min && order.total <= max);

export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));

export const groupAndCount = <T extends string | number>(values: T[]): Record<T, number> =>
  values.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: (accumulator[value] ?? 0) + 1,
    }),
    {} as Record<T, number>
  );
