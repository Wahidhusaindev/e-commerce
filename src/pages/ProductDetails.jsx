import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import {
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiStar,
  FiArrowLeft,
} from "react-icons/fi";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInCart = cartItems.some((item) => item.id === Number(id));
  const isInWishlist = wishlistItems.some((item) => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!res.ok) throw new Error("Failed to load product");

        const data = await res.json();
        setProduct(data);

        const relatedRes = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );

        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedProducts(
            relatedData.filter((p) => p.id !== data.id).slice(0, 4)
          );
        }
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (isInCart) return;
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) return;
    dispatch(addToWishlist(product));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold"
        >
          <FiArrowLeft /> Back to products
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-6"
        >
          <FiArrowLeft /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < Math.floor(product.rating?.rate || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-600">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <p className="text-4xl font-bold text-indigo-600">
              ${product.price}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 border rounded"
              >
                <FiMinus />
              </button>
              <span className="font-bold text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 border rounded"
              >
                <FiPlus />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold ${
                  isInCart
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                }`}
              >
                <FiShoppingCart />
                {isInCart ? "Already in Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleAddToWishlist}
                disabled={isInWishlist}
                className={`p-3 rounded-lg ${
                  isInWishlist
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 hover:bg-red-100 hover:text-red-600"
                }`}
              >
                <FiHeart />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 mx-auto object-contain mb-4"
                  />
                  <h3 className="font-semibold line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-indigo-600 font-bold">
                    ${item.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
