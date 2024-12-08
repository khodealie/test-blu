import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from './application/dto/create-product.dto';
import { PurchaseProductDto } from './application/dto/purchase-product.dto';
import { CreateProductCommand } from './application/commands/create-product.command';
import { PurchaseProductCommand } from './application/commands/purchase-product.command';
import { ListProductsQuery } from './application/queries/list-products.query';
import { GetProductQuery } from './application/queries/get-product.query';
import { DeleteProductCommand } from './application/commands/delete-product.command';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  async create(@Body() dto: CreateProductDto): Promise<{ id: string }> {
    const id = await this.commandBus.execute(
      new CreateProductCommand(dto.name, dto.description, dto.price, dto.stock),
    );
    return { id };
  }

  @Post('purchase')
  @ApiOperation({ summary: 'Purchase a product' })
  @ApiResponse({ status: 200, description: 'Product purchased' })
  async purchase(@Body() dto: PurchaseProductDto): Promise<void> {
    await this.commandBus.execute(
      new PurchaseProductCommand(dto.productId, dto.quantity),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'Products listed' })
  async findAll() {
    return this.queryBus.execute(new ListProductsQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved' })
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteProductCommand(id));
    return { status: 'deleted' };
  }
}
