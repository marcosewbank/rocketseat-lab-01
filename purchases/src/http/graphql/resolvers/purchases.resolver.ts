import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Args,
} from '@nestjs/graphql';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { CustomersService } from '../../../services/customer.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser, AuthUser } from '../../auth/current-user';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private PurchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
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

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.PurchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
