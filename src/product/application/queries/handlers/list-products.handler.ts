import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListProductsQuery } from '../list-products.query';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductDto } from '../../dto/product.dto';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(_: ListProductsQuery): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
    }));
  }
}
