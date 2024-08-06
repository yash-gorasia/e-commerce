import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <FaArrowLeft
                className={className}
                style={{ ...style, display: 'block', color: 'black', fontSize: '2rem', left: '-25px' }}
                onClick={onClick}
            />
        );
    };

    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <FaArrowRight
                className={className}
                style={{ ...style, display: 'block', color: 'black', fontSize: '2rem', right: '-25px' }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2500,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <div className="mb-4">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Slider
                    {...settings}
                    className="w-full"
                >
                    {products.map(
                        ({
                            image,
                            _id,
                            name,
                            price,
                            description,
                            brand,
                            createdAt,
                            numReviews,
                            rating,
                            quantity,
                            countInStock,
                        }) => (
                            <div key={_id} className="p-4">
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-72 rounded-lg"
                                />

                                <div className="mt-4 flex flex-col md:flex-row justify-between">
                                    <div className="flex flex-col space-y-4">
                                        <h2 className="text-2xl font-bold">{name}</h2>
                                        <p className="text-xl">Rs. {price}</p>
                                        <p className="text-gray-600 w-full md:w-[25rem]">
                                            {description.substring(0, 170)} ...
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between w-full md:w-[20rem]">
                                        <div className="flex flex-col space-y-4">
                                            <h1 className="flex items-center mb-2">
                                                <FaStore className="mr-2 text-black" /> Brand: {brand}
                                            </h1>
                                            <h1 className="flex items-center mb-2">
                                                <FaClock className="mr-2 text-black" /> Added:{" "}
                                                {moment(createdAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-2">
                                                <FaStar className="mr-2 text-black" /> Reviews: {numReviews}
                                            </h1>
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            <h1 className="flex items-center mb-2">
                                                <FaStar className="mr-2 text-black" /> Ratings:{" "}
                                                {Math.round(rating)}
                                            </h1>
                                            <h1 className="flex items-center mb-2">
                                                <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                                                {quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-2">
                                                <FaBox className="mr-2 text-black" /> In Stock: {countInStock}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </Slider>
            )}
        </div>
    );
};

export default ProductCarousel;
