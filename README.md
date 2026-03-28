# 📊 OrderFlow Dashboard

## ¿Qué es?

**OrderFlow Dashboard** es una aplicación web moderna de gestión y análisis de pedidos. Es un sistema administrativo que permite visualizar, filtrar y analizar órdenes de venta en tiempo real, proporcionando métricas clave para la toma de decisiones.

---

## 📋 Descripción del Proyecto

OrderFlow Dashboard es una aplicación construida con **Next.js 16** y **React 19** que funciona como panel administrativo para pequeños y medianos negocios. Permite a los gerentes y administradores:

- **Monitorear** el flujo de pedidos y su estado
- **Analizar** ventas por ciudad, método de pago y estado de pago
- **Filtrar** órdenes según criterios específicos
- **Visualizar** métricas agregadas (ingresos totales, ticket promedio, ciudad con más ventas)
- **Identificar** patrones de venta para optimizar el negocio


---

## 🎯 Problema que Resuelve

**Desafío:** Los negocios que crecen necesitan organizar decenas de pedidos diarios. Sin un sistema centralizado, es difícil:
- Conocer estado actual de cada pedido
- Saber cuánto facturaste esta semana
- Identificar cuál ciudad te genera más ingresos
- Ver si hay pagos pendientes

**Solución:** OrderFlow Dashboard centraliza todos los datos de pedidos en un lugar, con filtros inteligentes y métricas automáticas.

---

## 🏗️ Estructura del Proyecto

```
order-flow-dashboard/
├── app/
│   ├── layout.tsx          # Layout base de la aplicación
│   ├── page.tsx            # Página principal (Home)
│   └── globals.css         # Estilos globales
│
├── components/             # Componentes React reutilizables
│   ├── DashboardHeader.tsx    # Encabezado con título
│   ├── MetricCard.tsx         # Tarjetas de métricas (ingresos, pedidos, etc)
│   ├── OrderFilters.tsx       # Panel de filtros
│   ├── OrderTable.tsx         # Tabla de pedidos con datos
│   └── SalesSummary.tsx       # Resumen gráfico de ventas por estado
│
├── data/
│   └── orders.json         # Base de datos local con pedidos
│
├── types/
│   └── order.types.ts      # Definiciones de tipos TypeScript
│
├── utils/
│   ├── functional.helpers.ts  # ⭐ Funciones funcionales (map, filter, reduce, currying)
│   └── order.helpers.ts       # Lógica de negocio para procesar pedidos
│
├── public/                 # Archivos estáticos
├── package.json            # Dependencias del proyecto
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.ts      # Configuración de Tailwind CSS
└── next.config.ts          # Configuración de Next.js
```

---

## 💾 Fuente de Datos

Los datos provienen de **`data/orders.json`** - un archivo JSON local que simula una base de datos.

### Estructura de un Pedido:
```json
{
  "id": 1001,
  "customer": "Juan Perez",
  "status": "Pagado",
  "date": "2026-03-20",
  "paymentMethod": "Tarjeta",
  "city": "Nicoya",
  "total": 1240,
  "items": [
    {
      "name": "Laptop Pro 14",
      "category": "Tecnologia",
      "price": 1200,
      "quantity": 1
    }
  ]
}
```

### Campos Principales:
- **id**: Identificador único del pedido
- **customer**: Nombre del cliente
- **status**: Estado del pedido (`Pagado`, `Pendiente`, `Enviado`, `Cancelado`)
- **paymentMethod**: Método de pago (`Tarjeta`, `Transferencia`, `Efectivo`, `SINPE`)
- **city**: Ciudad de envío
- **total**: Monto total en CRC (Colones Costarricenses)
- **items**: Array de productos comprados

---

## 🔧 Dónde se Usa Programación Funcional

El proyecto implementa **todas** las técnicas de programación funcional (Grupo 5):

### 1️⃣ **Currying** - Funciones que retornan funciones
```typescript
// En: utils/functional.helpers.ts
export const applyDiscount =
  (percentage: number) =>
  (amount: number): number =>
    Number((amount * (1 - percentage / 100)).toFixed(2));

// Uso: const withDiscount = applyDiscount(8); // 8% descuento
//      const finalPrice = withDiscount(1000); // Aplica al monto
```

### 2️⃣ **Pure Functions** - Sin efectos secundarios
```typescript
// Las funciones siempre retornan el mismo resultado con los mismos inputs
export const formatCurrency = (value: number): string => ...
export const safeDivide = (numerator: number, denominator: number): number =>
  denominator === 0 ? 0 : Number((numerator / denominator).toFixed(2));
```

### 3️⃣ **Map** - Transforma cada elemento
```typescript
// Convierte pedidos a totales
export const mapOrderToTotals = (orders: Order[]): number[] =>
  orders.map((order) => order.total);

// Transforma órdenes a filas de tabla
export const mapOrdersToRows = (
  orders: Order[],
  discountPercentage: number,
  taxPercentage: number
): OrderTableRow[] => ...
```

### 4️⃣ **Filter** - Selecciona elementos que cumplen una condición
```typescript
// Filtra por estado
export const filterByStatus =
  (status: OrderStatus | "Todos") =>
  (orders: Order[]): Order[] =>
    status === "Todos" ? orders : orders.filter((order) => order.status === status);

// En order.helpers.ts se encadenan múltiples filtros:
return withStatus
  .filter((order) => haystack.includes(query))  // Búsqueda por texto
  .filter((order) => filters.city === "Todos" || order.city === filters.city)  // Por ciudad
  .filter((order) => filters.paymentMethod === "Todos" || order.paymentMethod === filters.paymentMethod)  // Por método
  .filter((order) => order.total >= filters.minTotal && order.total <= filters.maxTotal);  // Por rango
```

### 5️⃣ **Reduce** - Acumula valores en una sola pasada
```typescript
// Suma total de ventas
const totalSales = orders.reduce((accumulator, order) => 
  accumulator + order.total, 0);

// Agrupa y cuenta elementos
export const groupAndCount = <T extends string | number>(values: T[]): Record<T, number> =>
  values.reduce(
    (accumulator, value) => ({
      ...accumulator,
      [value]: (accumulator[value] ?? 0) + 1,
    }),
    {} as Record<T, number>
  );

// Resumen de ventas por estado
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
```

### 📍 **Ubicación Exacta:**
- `utils/functional.helpers.ts` - Utilidades funcionales puras
- `utils/order.helpers.ts` - Composición de funciones funcionales
- `app/page.tsx` - Uso de `useMemo` y composición

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Next.js** | 16.2.1 | Framework React con SSR |
| **React** | 19.2.4 | Biblioteca UI |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Estilos utility-first |
| **ESLint** | 9.x | Linting y calidad de código |

---

## 📊 Componentes Principales

### `DashboardHeader`
Encabezado de la página con título y descripción.

### `MetricCard`
Tarjetas que muestran:
- Ingresos totales
- Cantidad de órdenes
- Órdenes pagadas
- Órdenes pendientes
- Ticket promedio
- Top ciudad

### `OrderFilters`
Panel interactivo con filtros:
- Por estado (dropdown)
- Por ciudad (dropdown)
- Por método de pago (dropdown)
- Búsqueda por texto (cliente, ID, ciudad)
- Rango de precios (min-max)

### `OrderTable`
Tabla con columnas:
- ID del pedido
- Cliente
- Ciudad
- Fecha
- Estado
- Método de pago
- Total (con descuento e impuesto)

### `SalesSummary`
Resumen visual de ventas por estado de pago.

---

## 🎓 Aprendizajes Clave

Este proyecto demuestra:

✅ **Componentes reutilizables** - Separación de responsabilidades  
✅ **Programación funcional** - Map, filter, reduce, currying  
✅ **Pure functions** - Predecibilidad y testabilidad  
✅ **TypeScript** - Tipos seguros desde el inicio  
✅ **React Hooks** - `useState`, `useMemo` para optimización  
✅ **Separación de lógica** - Utils helpers separadas de componentes  
✅ **Datos locales** - JSON como fuente de verdad  

---

## 🛠️ Cómo Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
# → http://localhost:3000
```

---

## 📝 Casos de Uso

1. **Gerente quiere saber ingresos totales** → Ve MetricCard "Ingresos Totales"
2. **Necesita ver pedidos de Alajuela** → Filtra por ciudad "Alajuela"
3. **Busca pagos pendientes** → Filtra por estado "Pendiente"
4. **Quiere cliente específico** → Usa búsqueda por nombre
5. **Analiza rango de precios** → Ajusta minTotal y maxTotal
6. **Ve qué ciudad genera más ingresos** → Consulta métrica "Top Ciudad"

---

**Versión:** 1.0.0  
**Autor:** Proyecto Educativo - Fundamentos Web  
**Licencia:** MIT
