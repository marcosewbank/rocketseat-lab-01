import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private PurchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  Purchases() {
    return this.PurchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }
}
