import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { PurchaseProductHandler } from './commands/handlers/purchase-product.handler';
import { DeleteProductHandler } from './commands/handlers/delete-product.handler';
import { GetProductHandler } from './queries/handlers/get-product.handler';
import { ListProductsHandler } from './queries/handlers/list-products.handler';
import { ProductDomainModule } from '../domain/ product-domain.module';

export const CommandHandlers = [
  CreateProductHandler,
  PurchaseProductHandler,
  DeleteProductHandler,
];
export const QueryHandlers = [GetProductHandler, ListProductsHandler];

@Module({
  imports: [CqrsModule, ProductDomainModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class ProductCqrsModule {}
