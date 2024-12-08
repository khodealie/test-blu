import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductDomainService {
  constructor(private readonly productRepository: ProductRepository) {}

  async purchaseProduct(productId: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new Error('Product not found');
    product.purchase(quantity);
    await this.productRepository.update(product);
    await this.productRepository.recordHistory(
      productId,
      `Purchased ${quantity}`,
    );
  }
}
