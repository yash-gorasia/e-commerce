import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <div className="flex flex-col lg:flex-row justify-around items-center py-8">
            <div className="hidden lg:block w-full lg:w-1/2 overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                    {data.map((product) => (
                        <div key={product._id} className="p-4">
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-1/2 overflow-hidden">
                <ProductCarousel />
            </div>
        </div>
    );
};

export default Header;
