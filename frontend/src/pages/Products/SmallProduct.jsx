import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <div className="relative h-48">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full"
                />
            </div>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-semibold flex justify-between items-center">
                        <span>{product.name}</span>
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                            Rs. {product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;
