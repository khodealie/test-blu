import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../delete-product.command';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.productRepository.delete(command.id);
  }
}
