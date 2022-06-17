import productResolvers from './product.resolvers';

describe('createFreeCourse', () => {
  it('creates a course', async () => {
    const result = productResolvers.Query.getProducts();

    await expect(result).resolves.toEqual(true);
  });
});
