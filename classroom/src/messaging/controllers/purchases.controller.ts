import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface Customer {
  authUserId: string;
  product: Product;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
}

@Controller()
export class PurchaseController {
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log('teste', payload);
  }
}
