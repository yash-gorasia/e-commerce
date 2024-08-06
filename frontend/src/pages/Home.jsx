import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <div className="container mx-auto">
            {!keyword && <Header />}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {isError?.data.message || isError.error}
                </Message>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold mt-8">Special Products</h1>
                        <Link
                            to="/shop"
                            className="bg-pink-600 text-white font-bold rounded-full py-2 px-6 mt-8 hover:bg-pink-700 transition"
                        >
                            Shop
                        </Link>
                    </div>

                    <div className="flex justify-center flex-wrap mt-8 ml-12">
                        {data.products.map((product) => (
                            <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
