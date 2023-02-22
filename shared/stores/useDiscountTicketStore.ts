// import { LIMIT_ORDER_TABLE } from '@/shared/constants';
// import { NotifyType, OrderStage } from '@/shared/enums';
// import { Query } from '@/shared/interfaces/request/Query';
// import { ListResponse } from '@/shared/interfaces/response/ListResponse';
// import { Order } from '@/shared/interfaces/response/Order';

// interface DiscountTicketState {
//   tickets: Order[];
//   order: Order | null;
//   totalItems: number;
//   query: Query;
//   isLoading: boolean;
// }

// export const useDiscountTicketStore = defineStore('discount-ticket', {
//   state: (): DiscountTicketState => ({
//     tickets: [],
//     order: null,
//     totalItems: 0,
//     query: {
//       page: 1,
//       itemsPerPage: LIMIT_ORDER_TABLE,
//       sortBy: [],
//       search: '',
//     },
//     isLoading: false,
//   }),
//   actions: {
//     async fetchOrders() {
//       this.isLoading = true;
//       const { data, error } = await useFetch<ListResponse<Order>>(
//         '/orders/admin/',
//         {
//           ...useFetchOptions(),
//           params: {
//             ...convertQueryParam(this.query),
//             expand: 'owner.full_name',
//           },
//         },
//       );
//       if (!error.value) {
//         this.orders = data.value!.results;
//         this.totalItems = data.value!.count;
//       }
//       this.isLoading = false;
//     },
//     async fetchOrder(id: number) {
//       this.isLoading = true;
//       const { data, error } = await useFetch<Order>(`/orders/admin/${id}/`, {
//         ...useFetchOptions(),
//         query: {
//           expand:
//             'address,owner,order_items.product_variant,order_items.product_variant.product',
//         },
//       });
//       if (!error.value) {
//         this.order = data.value!;
//       }
//       this.isLoading = false;
//     },

//     async updateOrderStage(id: number, newStage: OrderStage) {
//       this.isLoading = true;
//       const { error } = await useFetch(`/orders/admin/${id}/`, {
//         ...useFetchOptions(),
//         method: 'PATCH',
//         body: {
//           stage: newStage,
//         },
//       });
//       if (!error.value) {
//         showSnackbar(NotifyType.SUCCESS, 'Order status is updated.');
//       }
//       this.isLoading = false;
//     },
//   },
// });
