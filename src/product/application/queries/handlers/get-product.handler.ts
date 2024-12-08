import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../get-product.query';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductDto } from '../../dto/product.dto';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<ProductDto> {
    const product = await this.productRepository.findById(query.id);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };
  }
}
