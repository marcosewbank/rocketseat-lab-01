import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { CurrentUser, AuthUser } from '../../auth/current-user';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CustomersService } from '../../../services/customer.service';
import { PurchasesService } from '../../../services/purchases.service';

import { Customer } from '../models/curstomer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchaseService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.listAllFromCustomer(customer.id);
  }
}
