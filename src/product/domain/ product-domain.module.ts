import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { ProductRepository } from './repositories/product.repository';
import { PrismaProductRepository } from '../infrastructure/prisma-product.repository';
import { ProductDomainService } from './services/product-domain.service';

@Module({
  providers: [
    PrismaService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
    ProductDomainService,
  ],
  exports: [ProductRepository, ProductDomainService],
})
export class ProductDomainModule {}
