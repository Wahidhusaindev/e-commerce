import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  //Selectors with Fallbacks (Prevents the "filter of undefined" error)
  const productItems = useSelector((state) => state.products?.data || []);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.data || []);
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  // Derived State
  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const wishlistCount = wishlistItems.length;

  //  Filtering Logic
  console.log("Current Query:", debouncedQuery);
console.log("Total Items in Redux:", productItems.length);

const filteredProducts = debouncedQuery.length > 1
  ? productItems.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const query = debouncedQuery.toLowerCase();
      return title.includes(query);
    }).slice(0, 5)
  : [];

console.log("Found matching items:", filteredProducts.length);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* TOP BAR */}
      <div className="hidden md:flex justify-between px-12 py-2 text-sm text-gray-600 border-b">
        <span>Call: +0123 456 789</span>
        <div className="flex gap-6 items-center">
          <span>USD</span>
          <span>English</span>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">
                Hi, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-black font-medium">
              Sign in / Sign up
            </Link>
          )}
        </div>
      </div>

      {/* MAIN ROW */}
      <div className="flex items-center justify-between px-4 md:px-12 py-4 gap-4">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-indigo-700"
          >
            SHOPX
          </Link>
        </div>

        {/* CENTER: Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <div className="flex w-full border-2 border-gray-100 focus-within:border-indigo-500 rounded-lg overflow-hidden transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for items..."
              className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
            />
            <button className="bg-[#f9b233] px-6 text-white hover:bg-yellow-600">
              <FiSearch />
            </button>
          </div>

          {/* Search Dropdown */}
          {debouncedQuery.length > 1 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-2xl mt-2 rounded-lg z-50 overflow-hidden">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-4 p-3 hover:bg-indigo-50 border-b border-gray-50 last:border-none transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-contain bg-white"
                    />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {product.title}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found for "{debouncedQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FiSearch className="w-5 h-5 text-gray-700" />
          </button>

          <Link
            to="/wishlist"
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all"
          >
            <FiHeart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all"
          >
            <FiShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="hidden md:flex p-2 text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <FiUser className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH INPUT */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top duration-200">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-[#f9b233] px-4 text-white">
              <FiSearch />
            </button>
          </div>
        </div>
      )}

      {/* NAVIGATION BAR */}
      <nav className="bg-[#2c2c2c] overflow-hidden">
        <ul
          className={`px-4 md:px-12 py-3 text-white text-xs uppercase tracking-wider
          flex flex-col md:flex-row gap-4 md:gap-10
          ${mobileMenu ? "block" : "hidden"} md:flex font-medium`}
        >
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link
            to="/electronics"
            className="hover:text-yellow-400 transition-colors"
          >
            Electronics
          </Link>
          <Link
            to="/mens-clothing"
            className="hover:text-yellow-400 transition-colors"
          >
            Men's Fashion
          </Link>
          <Link
            to="/womens-clothing"
            className="hover:text-yellow-400 transition-colors"
          >
            Women's Fashion
          </Link>
          <Link
            to="/jewelery"
            className="hover:text-yellow-400 transition-colors"
          >
            Jewellery
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
