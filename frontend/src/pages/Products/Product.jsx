import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-xl font-semibold">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              Rs. {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
