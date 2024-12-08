import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  abstract findById(id: string): Promise<Product | null>;

  abstract findAll(): Promise<Product[]>;

  abstract update(product: Product): Promise<void>;

  abstract delete(id: string): Promise<void>;

  abstract recordHistory(productId: string, action: string): Promise<void>;
}
