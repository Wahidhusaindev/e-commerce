import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
const Jewelery = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts("jewelery"));
    }
  }, [dispatch, status]);

  const jeweleryProducts = useMemo(
    () => products.filter((p) => p.category === "jewelery"),
    [products],
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);
  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Jewelery Items</h1>
          <p className="text-indigo-100 text-lg">
            Discover our premium selection of Jewelery Items and accessories
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {status === "success" && jeweleryProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jeweleryProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                  />
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                      isInWishlist(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-gray-800 font-semibold line-clamp-2 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {product.title}
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center mt-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating.rate)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating.count})
                    </span>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        isInCart(product.id)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white"
                      }`}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "success" && jeweleryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jewelry products available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jewelery;
