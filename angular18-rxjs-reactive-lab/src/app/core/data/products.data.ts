import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Keyboard', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 99, stock: 10 },
  { id: 2, name: 'RxJS Mouse', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 59, stock: 18 },
  { id: 3, name: 'State Management Book', categoryId: 'books', categoryLabel: 'Books', status: 'active', price: 29, stock: 22 },
  { id: 4, name: 'Signals Handbook', categoryId: 'books', categoryLabel: 'Books', status: 'draft', price: 35, stock: 0 },
  { id: 5, name: 'Template Control Flow Guide', categoryId: 'books', categoryLabel: 'Books', status: 'archived', price: 21, stock: 0 },
  { id: 6, name: 'Standalone Starter', categoryId: 'software', categoryLabel: 'Software', status: 'active', price: 149, stock: 5 },
  { id: 7, name: 'Reactive Forms Pro', categoryId: 'software', categoryLabel: 'Software', status: 'draft', price: 199, stock: 3 },
  { id: 8, name: 'HTTP Cache Toolkit', categoryId: 'software', categoryLabel: 'Software', status: 'active', price: 179, stock: 7 },
  { id: 9, name: 'Autocomplete Patterns', categoryId: 'software', categoryLabel: 'Software', status: 'active', price: 129, stock: 9 },
  { id: 10, name: 'Pagination Desk Pad', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 19, stock: 60 },
  { id: 11, name: 'Autosave Notebook', categoryId: 'books', categoryLabel: 'Books', status: 'active', price: 16, stock: 40 },
  { id: 12, name: 'Cancel Previous Requests Mug', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'draft', price: 12, stock: 15 }
];
