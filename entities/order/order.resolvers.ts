import {Context} from '../../types';
import {ClientType} from '../client/client.types';
import {ProductType} from '../product/product.types';
import {OrderInput, OrderType} from './order.types';
import {Order} from './Order.model';
import {Client} from '../client/Client.model';
import {Product} from '../product/Product.model';

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
  },
  Mutation: {
    newOrder: async (
      _: any,
      {input}: {input: OrderInput},
      context: Context,
    ) => {
      try {
        const {client} = input;

        const clientAlreadyExists: ClientType | null = await Client.findById(
          client,
        );

        if (!clientAlreadyExists) {
          throw new Error('Client not found');
        }

        if (String(clientAlreadyExists.seller) !== context.user._id) {
          throw new Error(
            `This user don't have enough permissions for this Client`,
          );
        }

        for await (const article of input.order) {
          const product: ProductType | null = await Product.findById(
            article.id,
          );

          if (!product) {
            throw new Error(`This product is not registered`);
          }

          if (article.quantity > product?.stock) {
            throw new Error(
              `The product "${product.name}" doesn't have enough stock`,
            );
          } else {
            product.stock = product.stock - article.quantity;
            await product.save();
          }
        }

        const newOrder = new Order(input);
        newOrder.seller = context.user._id;
        const result = await newOrder.save();
        return result;
      } catch (error) {
        throw new Error(`Error creating a new order: ${error}`);
      }
    },
    updateOrder: async (
      _: any,
      {id, input}: {id: string; input: OrderInput},
      context: Context,
    ) => {
      try {
        let order = await Order.findById(id);
        const client = await Client.findById(input.client);

        if (!order) {
          throw new Error('Order not found');
        }

        if (!client) {
          throw new Error('Client not found');
        }

        if (String(client.seller) !== context.user._id) {
          throw new Error(
            `This user don't have the permissions to update this order`,
          );
        }

        for await (const article of input.order) {
          const product: ProductType | null = await Product.findById(
            article.id,
          );

          if (!product) {
            throw new Error(`This product is not registered`);
          }

          if (article.quantity > product?.stock) {
            throw new Error(
              `The product "${product.name}" doesn't have enough stock`,
            );
          } else {
            product.stock = product.stock - article.quantity;
            await product.save();
          }
        }

        order = await Order.findOneAndUpdate({_id: id}, input, {new: true});

        return order;
      } catch (error) {
        throw new Error(`Error updating client: ${error}`);
      }
    },
  },
};
