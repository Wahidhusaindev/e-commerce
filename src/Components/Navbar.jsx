import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
// import { useSelector } from "react-redux";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  // const cartCount = useSelector((state) => state.cart.items.length);
  // const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ShopX
        </Link>

        {/* Search */}
        <div className="flex items-center gap-3">
          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          <FiSearch
            className="text-xl cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Wishlist */}
          {/* <Link to="/wishlist" className="relative">
            <FiHeart className="text-xl" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link> */}

          {/* Cart */}
          {/* <Link to="/cart" className="relative">
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link> */}

          {/* Login */}
          <Link
            to="/login"
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
          >
            <FiUser />
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
