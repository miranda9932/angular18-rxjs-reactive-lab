import { ProductStatus } from './product.model';

export interface SearchProductsParams {
  q?: string;
  category?: string;
  status?: ProductStatus | '';
  page?: number;
  pageSize?: number;
  latencyMs?: number;
  forceError?: boolean;
}
