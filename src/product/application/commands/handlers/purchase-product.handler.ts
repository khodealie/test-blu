import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseProductCommand } from '../purchase-product.command';
import { ProductDomainService } from '../../../domain/services/product-domain.service';

@CommandHandler(PurchaseProductCommand)
export class PurchaseProductHandler
  implements ICommandHandler<PurchaseProductCommand>
{
  constructor(private readonly domainService: ProductDomainService) {}

  async execute(command: PurchaseProductCommand): Promise<void> {
    await this.domainService.purchaseProduct(
      command.productId,
      command.quantity,
    );
  }
}
