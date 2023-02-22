<template>
  <v-container v-if="order">
    <v-card>
      <v-card-title class="text-primary">
        Order: {{ order.code }}
      </v-card-title>
      <v-card-text>
        <!-- Shipping Information -->
        <v-row class="mb-4">
          <v-col cols="5">
            <div class="title mb-1">Buyer</div>
            <div>
              {{ order.owner.full_name }}
            </div>
            <div>{{ order.owner.phone }}</div>
            <div>{{ order.owner.email }}</div>
          </v-col>
          <v-col cols="5">
            <div class="title mb-1">Shipping to</div>
            <div>
              <div>
                {{ order.address.full_name }}
              </div>
              <div>{{ order.address.phone }}</div>
            </div>
            <div class="text-grey-darken-2">
              <div>
                {{ order.address.ward }}, {{ order.address.district }},
                {{ order.address.city }}
              </div>
              <div>{{ order.address.detail }}</div>
            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <span class="title mb-1">Status: </span>
              <span
                class="font-weight-bold"
                :class="{
                'text-warning': order!.stage === OrderStage.TO_SHIP,
                'text-info': order!.stage === OrderStage.TO_RECEIVE,
                'text-primary': order!.stage === OrderStage.COMPLETED,
                'text-error': order!.stage === OrderStage.CANCELLED,
              }"
                >{{ enumToCapitalize(order.stage) }}</span
              >
            </div>
            <div v-if="order!.stage === OrderStage.TO_SHIP">
              <v-btn
                class="bg-info mt-1"
                @click="
                  showDialog(
                    NotifyType.INFO,
                    'Update order stage?',
                    'Have you forwarded your order to the shipping company and want to update the status of this order?',
                    'UPDATE',
                    () => {
                      orderStore.updateOrderStage(
                        orderId,
                        OrderStage.TO_RECEIVE,
                      );
                      order!.stage = OrderStage.TO_RECEIVE;
                    },
                  )
                "
              >
                Prepared
              </v-btn>
              <v-btn
                class="bg-error mt-2"
                @click="
                  showDialog(
                    NotifyType.ERROR,
                    'Cancel this order?',
                    'Are you sure you want to cancel this order?',
                    'CONFIRM',
                    () => {
                      orderStore.updateOrderStage(
                        orderId,
                        OrderStage.CANCELLED,
                      );
                      order!.stage = OrderStage.CANCELLED;
                    },
                  )
                "
              >
                Cancel
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <!-- Order Items -->
        <div class="title mb-2">Order Items</div>
        <v-row no-gutters>
          <v-col
            cols="6"
            v-for="{
              id,
              quantity,
              product_variant,
              product_variant: { product },
            } in useFlatMap(order.order_items, (el) => [el, el, el, el, el])"
            :key="id"
          >
            <v-row class="bg-grey-lighten-3 pa-2 ma-1 rounded">
              <img :src="product!.image" height="64" class="me-2" />
              <div>
                <NuxtLink
                  :to="{
                  name: ROUTE_NAME.PRODUCT.DETAIL,
                  params: { productId: product!.id },
                }"
                >
                  {{ product!.name }}
                </NuxtLink>
                <div class="product-desc text-grey-darken-2">
                  {{ product_variant.color }} -
                  {{ product_variant.size }}
                </div>
                <div class="product-desc text-grey-darken-2">
                  Quantity: {{ quantity }}
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="product-desc text-grey-darken-2 align-self-end">
                <Price :value="product_variant.price"></Price>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <!-- Order Summary -->
        <div class="title mt-3">Order Summary</div>
        <div class="mt-2">
          <div class="d-flex justify-space-between">
            <div>Subtotal</div>
            <div>
              <Price :value="order.subtotal"></Price>
            </div>
          </div>
          <div class="d-flex justify-space-between" v-if="order.discount">
            <div>Discount</div>
            <div>
              <Price :value="order.discount"></Price>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Total</div>
            <div>
              <Price :value="order.amount"></Price>
            </div>
          </div>
        </div>
        <!-- Payment method -->
        <div class="title mt-3">
          Payment method:
          <span class="font-weight-bold">{{ order.payment_method }}</span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ROUTE_NAME } from '@/routes';
import { NotifyType, OrderStage } from '@/shared/enums';

useHead({
  title: 'Order Detail',
});

const orderStore = useOrderStore();
const route = useRoute();

const orderId = computed(() => {
  return parseInt(route.params.orderId as string);
});

const order = computed(() => {
  return orderStore.order;
});

onMounted(() => {
  orderStore.fetchOrder(orderId.value);
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
}
.product-desc {
  font-size: 13px;
}
</style>
