import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductModule } from '../src/product/product.module';
import * as request from 'supertest';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Test Product', price: 100, stock: 10 })
      .expect(201);
    expect(response.body.id).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
