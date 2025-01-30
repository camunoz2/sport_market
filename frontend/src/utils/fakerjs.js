import { faker } from '@faker-js/faker';

const CATEGORIES = ['Running Shoes', 'Basketball Shoes', 'Training Shoes', 'Sports T-Shirts', 'Shorts', 'Hoodies'];
const BRANDS = ['Nike', 'Adidas', 'Under Armour', 'Puma', 'New Balance'];

export const generateProduct = () => ({
  id: faker.string.uuid(),
  name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
  brand: faker.helpers.arrayElement(BRANDS),
  category: faker.helpers.arrayElement(CATEGORIES),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price({ min: 30, max: 200 }),
  image: faker.image.urlLoremFlickr({ category: 'sports' }),
  sizes: ['S', 'M', 'L', 'XL'],
  colors: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.color.human()),
  stock: faker.number.int({ min: 0, max: 50 })
});

export const generateProducts = (count) => Array.from({ length: count }, generateProduct);