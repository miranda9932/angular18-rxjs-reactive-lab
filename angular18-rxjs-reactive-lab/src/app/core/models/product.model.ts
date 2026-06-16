export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: number;
  name: string;
  categoryId: string;
  categoryLabel: string;
  status: ProductStatus;
  price: number;
  stock: number;
}
