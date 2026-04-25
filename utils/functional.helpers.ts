import { Order, OrderStatus } from "@/types/order.types";


// 1) applyDiscount - CURRYING (funcion de dos niveles)
// Paso 1: recibe el porcentaje de descuento y lo deja configurado.
// Paso 2: retorna otra funcion que luego recibira el monto.
// Paso 3: calcula monto * (1 - porcentaje/100).
// Paso 4: redondea a 2 decimales para mantener formato monetario.
export const applyDiscount =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 - percentage / 100)).toFixed(2));


// 2) safeDivide - PURE FUNCTION (sin efectos secundarios)
// Paso 1: recibe numerador y denominador.
// Paso 2: valida si el denominador es 0 para evitar division invalida.
// Paso 3: si es 0, retorna 0 como valor seguro.
// Paso 4: si no es 0, divide y redondea a 2 decimales.
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));


// 3) filterByStatus - FILTER + CURRYING
// Paso 1: recibe un estado objetivo (o "Todos").
// Paso 2: retorna una funcion que recibe el arreglo de ordenes.
// Paso 3: si el estado es "Todos", devuelve el arreglo original.
// Paso 4: en otro caso, filtra solo las ordenes con estado coincidente.

export const filterByStatus =
  (status: OrderStatus | "Todos") =>
  (orders: Order[]): Order[] =>
    status === "Todos" ? orders : orders.filter((order) => order.status === status);

// 4) mapOrderToTotals - MAP
// Paso 1: recorre cada orden del arreglo.
// Paso 2: extrae unicamente la propiedad total de cada orden.
// Paso 3: retorna un nuevo arreglo de numeros (totales).
export const mapOrderToTotals = (orders: Order[]): number[] =>
  orders.map((order) => order.total);


// 5) groupAndCount - REDUCE
// Paso 1: inicia un acumulador vacio como objeto.
// Paso 2: recorre cada valor del arreglo de entrada.
// Paso 3: toma el conteo actual del valor (o 0 si no existe).
// Paso 4: incrementa el conteo y retorna el nuevo acumulador.
// Paso 5: al finalizar, obtiene un objeto tipo { valor: cantidad }.
export const groupAndCount = <T extends string | number>(values: T[]): Record<T, number> =>
  values.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: (accumulator[value] ?? 0) + 1,
    }),
    {} as Record<T, number>
  );
