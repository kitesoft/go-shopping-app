export interface Order {
  id: number;
  transaction_id: string;
  user_id: string;
  code: string;
  ambassador_email: string;
  name: string;
  total: number;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  complete: string;
  order_item: any[];
}

export interface OrderItems {
  admin_revenue: number;
  ambassodar_revenue: number;
  id: number;
  order_id: number;
  price: number;
  product_title: string;
  quantity: number;
}
