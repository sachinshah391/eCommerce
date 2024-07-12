import React, { useEffect, useState } from "react";
import "../themes/Product.css";
import { useCart } from "../context/CartContext";

interface ProductType {
  quantity: number;
  id: number;
  name: string;
  description?: string;
  title: string;
  price: number;
  image: string;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const skeletonCount = 10;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProductData();
  }, []);

  console.log("value of data", products);

  if (loading) {
    return (
      <div className="product-list skeleton-loading">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="skeleton-product-card"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <h2 className="product-name" title={product.title}>
              {product.title}
            </h2>
            <p className="product-description" title={product.description}>
              {product.description}
            </p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
