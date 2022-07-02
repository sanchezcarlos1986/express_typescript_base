import {Product} from './Product.model';
import {IdPayload} from '../../types';

export default {
  Query: {
    getProducts: async () => {
      try {
        const products = await Product.find({});

        return products;
      } catch (error) {
        throw new Error(`Error getting all products: ${error}`);
      }
    },
    getProduct: async (_: any, {id}: IdPayload) => {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    },
    searchProduct: async (_: any, {input}: {input: string}) => {
      const products = await Product.find({$text: {$search: input}});

      return products;
    },
  },
};
