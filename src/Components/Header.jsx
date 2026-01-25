import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dispatch = useDispatch();

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((t, i) => t + i.quantity, 0),
  );
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* TOP BAR (desktop only) */}
      <div className="hidden md:flex justify-between px-12 py-2 text-sm text-gray-600 border-b">
        <span>Call: +0123 456 789</span>
        <div className="flex gap-6">
          <span>USD</span>
          <span>English</span>
          <Link to="/login" className="hover:text-black">
            Sign in / Sign up
          </Link>
        </div>
      </div>

      {/* MAIN ROW */}
      <div className="flex items-center justify-between px-4 md:px-12 py-4 gap-4">
        {/* LEFT: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className="text-2xl font-bold">
            ShopX
          </Link>
        </div>

        {/* SEARCH (desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border border-gray-300 px-4 py-3 text-sm"
          />
          <button className="bg-[#f9b233] px-5 text-white">
            <FiSearch />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Search toggle (mobile) */}
          <button
            className="md:hidden p-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FiSearch />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiHeart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 border border-gray-300 px-4 py-3"
            />
            <button className="bg-[#f9b233] px-4 text-white">
              <FiSearch />
            </button>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="bg-[#2c2c2c]">
        <ul
          className={`px-4 md:px-12 py-4 text-white text-sm uppercase
          flex flex-col md:flex-row gap-4 md:gap-8
          ${mobileMenu ? "block" : "hidden"} md:flex`}
        >
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link to='/electronics' className="hover:text-yellow-500">Electronics</Link>
          <Link to="/mens-clothing" className="hover:text-yellow-500">
            Men
          </Link>
          <Link to="/womens-clothing" className="hover:text-yellow-500">
            Women
          </Link>
          
          <Link to='/jewelery' className="hover:text-[#f9b233]">Jewellery</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
