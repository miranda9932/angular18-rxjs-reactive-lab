import { ProductStatus } from './product.model';

export interface SearchProductsParams {
  query?: string;
  category?: string;
  status?: ProductStatus | '';
  page?: number;
  pageSize?: number;
  latencyMs?: number;
  forceError?: boolean;
}
