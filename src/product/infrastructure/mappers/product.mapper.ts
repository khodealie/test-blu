import { Product } from '../../domain/entities/product.entity';
import { Product as PrismaProduct } from '@prisma/client';

export class ProductMapper {
  static toDomain(prismaProduct: PrismaProduct): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.price,
      prismaProduct.stock,
      prismaProduct.description,
    );
  }
}
