import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { v4 as uuid } from 'uuid';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<string> {
    const product = new Product(
      uuid(),
      command.name,
      command.price,
      command.stock,
      command.description,
    );
    await this.productRepository.create(product);
    return product.id;
  }
}
