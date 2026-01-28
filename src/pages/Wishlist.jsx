import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mb-8">
          Add some products to your wishlist to keep track of items you like!
        </p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-contain p-4"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.id}`}>
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {item.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-indigo-600">
                  ${item.price}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">
                    {item.rating.rate} ({item.rating.count})
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isInCart(item.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium ${
                    isInCart(item.id)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <FiShoppingCart />
                  {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
