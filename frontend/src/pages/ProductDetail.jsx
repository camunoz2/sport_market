import { useParams } from "react-router";
import { generateProduct } from "../utils/fakerjs"; // Assuming you already generate product data

const ProductDetail = () => {
  let params = useParams();
  const product = generateProduct();

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div key={params}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Available sizes: {product.sizes.join(", ")}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
