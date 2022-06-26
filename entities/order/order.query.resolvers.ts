import {Context} from '../../types';
import {Order} from './Order.model';
import {OrderType} from './order.types';

export default {
  Query: {
    getOrders: async () => {
      try {
        const orders: Array<OrderType> = await Order.find({});
        return orders;
      } catch (error) {
        throw new Error(`Error getting the Orders: ${error}`);
      }
    },
    getOrdersBySeller: async (_: any, {}: any, context: Context) => {
      try {
        const orders: Array<OrderType> = await Order.find({
          seller: context.user._id,
        });

        return orders;
      } catch (error) {
        throw new Error(`Error getting all orders for this seller: ${error}`);
      }
    },
    getOrder: async (_: any, {id}: {id: string}, context: Context) => {
      try {
        const order: OrderType | null = await Order.findById(id);

        if (!order) {
          throw new Error(`Order not found`);
        }

        if (String(order.seller) !== context.user._id) {
          throw new Error(
            `This user don't have enough permissions for this Order`,
          );
        }

        return order;
      } catch (error) {
        throw new Error(`Error getting the Orders: ${error}`);
      }
    },
    getOrderByState: async (
      _: any,
      {state}: {state: string},
      context: Context,
    ) => {
      try {
        const orders: Array<OrderType> = await Order.find({
          state: state,
          seller: context.user._id,
        });

        return orders;
      } catch (error) {
        throw new Error(`Error getting all orders by state: ${error}`);
      }
    },
  },
};
