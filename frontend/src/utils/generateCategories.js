import products from '../data/products';

export const generateCategories = () => {
  const categories = new Set();
  products.forEach(product => {
    categories.add(product.category);
  });
  return Array.from(categories);
};
