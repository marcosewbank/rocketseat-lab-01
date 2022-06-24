import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreateProductParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error('Product not found.');

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}