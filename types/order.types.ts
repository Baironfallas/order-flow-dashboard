export type OrderStatus = "Pagado" | "Pendiente" | "Enviado" | "Cancelado";

export type PaymentMethod = "Tarjeta" | "Transferencia" | "Efectivo" | "SINPE";

export interface OrderItem {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customer: string;
  status: OrderStatus;
  date: string;
  paymentMethod: PaymentMethod;
  city: string;
  total: number;
  items: OrderItem[];
}

export interface OrderFilters {
  status: OrderStatus | "Todos";
  city: string;
  paymentMethod: PaymentMethod | "Todos";
  search: string;
  minTotal: number;
  maxTotal: number;
}

export interface DashboardMetrics {
  totalSales: number;
  orderCount: number;
  paidOrders: number;
  pendingOrders: number;
  averageTicket: number;
  topCity: string;
}

export interface SalesByStatus {
  status: OrderStatus;
  count: number;
  total: number;
}

export interface SalesByCategory {
  category: string;
  total: number;
  units: number;
}

export interface OrderTableRow {
  id: number;
  customer: string;
  city: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  date: string;
  total: number;
  discountedTotal: number;
  itemCount: number;
}
