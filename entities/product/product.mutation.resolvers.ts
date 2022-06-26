import {Product} from './Product.model';
import {ProductInput} from './product.types';

export default {
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
