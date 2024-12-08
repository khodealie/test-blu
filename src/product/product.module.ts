import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCqrsModule } from './application/cqrs.module';
import { PrismaService } from '../config/prisma.service';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductDomainService } from './domain/services/product-domain.service';
import { ProductDomainModule } from './domain/ product-domain.module';

@Module({
  imports: [ProductCqrsModule, ProductDomainModule],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    ProductDomainService,
  ],
  exports: [ProductRepository],
})
export class ProductModule {}
