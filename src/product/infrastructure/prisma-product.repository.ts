import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repositories/product.repository';
import { Product } from '../domain/entities/product.entity';
import { PrismaService } from '../../config/prisma.service';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    await this.recordHistory(product.id, 'Created');
  }

  async findById(id: string): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    return data ? ProductMapper.toDomain(data) : null;
  }

  async findAll(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();
    return data.map(ProductMapper.toDomain);
  }

  async update(product: Product): Promise<void> {
    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    await this.recordHistory(product.id, 'Updated');
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
    await this.recordHistory(id, 'Deleted');
  }

  async recordHistory(productId: string, action: string): Promise<void> {
    await this.prisma.productHistory.create({
      data: { productId, action },
    });
  }
}
