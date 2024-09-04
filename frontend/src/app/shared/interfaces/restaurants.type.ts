export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  description: string;
  phone: string;
  address: string;
  menuItems: MenuItem[];
}
