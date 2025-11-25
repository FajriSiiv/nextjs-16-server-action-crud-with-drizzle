export type EmployeesType = {
  name: string;
  id: number;
  position: string;
};

export type ProductsType = {
  name: string;
  price: number;
  category: "cloth" | "food" | "jewelry" | "electronic";
  description: string;
  id: number;
  slug_product: string;
  createdAt: Date;
};
