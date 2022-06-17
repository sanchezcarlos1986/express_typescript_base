import {Product} from '../../models/Product';
import {IdPayload, ProductInput} from '../../types';

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
  },
  Mutation: {
    newProduct: async (_: any, {input}: ProductInput) => {
      try {
        const user = new Product(input);
        user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating a new product: ${error}`);
      }
    },
    updateProduct: async (
      _: any,
      {id, input}: {id: string; input: ProductInput},
    ) => {
      try {
        let product = await Product.findById(id);

        if (!product) {
          throw new Error('Product not found');
        }

        product = await Product.findOneAndUpdate({_id: id}, input, {new: true});

        return product;
      } catch (error) {
        throw new Error(`Error updating product: ${error}`);
      }
    },
    deleteProduct: async (_: any, {id}: {id: string}) => {
      try {
        const product = await Product.findById(id);

        if (!product) {
          throw new Error('Product not found');
        }

        await Product.findOneAndDelete({_id: id});

        return 'Product deleted';
      } catch (error) {
        throw new Error(`Error updating product: ${error}`);
      }
    },
  },
};
