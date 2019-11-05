// core services
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// checkout components
import { CartComponent } from 'src/app/checkout/containers/cart/cart.component';
import { CheckoutAddressComponent } from 'src/app/checkout/containers/checkout-address/checkout-address.component';
import { CheckoutComponent } from 'src/app/checkout/containers/checkout/checkout.component';
import { CheckoutSectionBaseComponent } from 'src/app/checkout/components/checkout-section-base/checkout-section-base.component';
import { OrderSummaryComponent } from 'src/app/checkout/components/order-summary/order-summary.component';

// shared module
import { SharedModule } from 'src/app/shared';

// checkout routing
import { CheckoutRoutingModule } from 'src/app/checkout/checkout-routing.module';
import { CheckoutPaymentComponent } from 'src/app/checkout/containers/checkout-payment/checkout-payment.component';
import { PaymentPurchaseOrderComponent } from 'src/app/checkout/components/payment-purchase-order/payment-purchase-order.component';
import { PaymentSpendingAccountComponent } from 'src/app/checkout/components/payment-spending-account/payment-spending-account.component';
import { OrderConfirmationComponent } from 'src/app/checkout/containers/order-confirmation/order-confirmation.component';
import { CheckoutConfirmComponent } from 'src/app/checkout/components/checkout-confirm/checkout-confirm.component';
import { PaymentBaseComponent } from './components/payment-base/payment-base.component';

@NgModule({
  imports: [SharedModule, CheckoutRoutingModule, FormsModule],
  declarations: [
    CartComponent,
    CheckoutAddressComponent,
    CheckoutComponent,
    CheckoutSectionBaseComponent,
    OrderSummaryComponent,
    PaymentBaseComponent,
    CheckoutPaymentComponent,
    PaymentPurchaseOrderComponent,
    PaymentSpendingAccountComponent,
    OrderConfirmationComponent,
    CheckoutConfirmComponent,
  ],
})
export class CheckoutModule {}
