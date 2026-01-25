import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar, FiTrendingUp } from 'react-icons/fi'
import Carousel from '../Components/Carousel.jsx'
import FAQ from './FAQ.jsx'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { data: products, status, error } = useSelector(state => state.products)
  const cartItems = useSelector(state => state.cart.items)
  const wishlistItems = useSelector(state => state.wishlist.items)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product))
  }

  const isInCart = (id) => cartItems.some(item => item.id === id)
  const isInWishlist = (id) => wishlistItems.some(item => item.id === id)

  // Get featured products (highest rated)
  const featuredProducts = products
    .filter(product => product.rating.rate >= 4.5)
    .slice(0, 5)

  // Hero carousel data
  const heroSlides = [
    {
      id: 1,
      title: "Welcome to ShopX",
      subtitle: "Discover amazing products at great prices",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      cta: "Shop Now",
      link: "/"
    },
    {
      id: 2,
      title: "Free Shipping",
      subtitle: "On orders over $50",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop",
      cta: "Learn More",
      link: "/"
    },
    {
      id: 3,
      title: "Quality Guaranteed",
      subtitle: "30-day return policy",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=400&fit=crop",
      cta: "Browse Products",
      link: "/"
    }
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-6">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Products</h1>
            <p className="text-gray-600 mb-6">
              {error || "We're having trouble loading our products right now. Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What you can do:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Try again in a few minutes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel
          items={heroSlides}
          autoPlay={true}
          autoPlayInterval={6000}
          renderItem={(slide) => (
            <div className="relative h-96 md:h-125 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/60"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-3xl mb-10 text-gray-200 font-light leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25"
                  >
                    {slide.cta}
                    <FiTrendingUp className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        />
      </section>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-6">
                <FiTrendingUp className="w-6 h-6 text-indigo-600" />
                <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">Featured Collection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                Premium Products
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of top-rated products loved by our customers
              </p>
            </div>
            <Carousel
              items={featuredProducts}
              autoPlay={false}
              renderItem={(product) => (
                <div className=" bg-gray-200 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden mx-3 border border-gray-300 transition-all duration-500 hover:-translate-y-2 group">
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img 
                       loading="eager"
  fetchpriority="high"
                      src={product.image} alt={product.title} className="w-full h-56 object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                      {/* Black screen overlay */}
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                            View Details
                          </span>
                        </div>
                      </div>
                      {/* Dark overlay for better text visibility */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 text-lg leading-tight">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-semibold text-gray-700">{product.rating.rate}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart(product.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isInCart(product.id)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                      }`}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section className="py-16 px-4 bg-linear-to-br from-gray-300 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Complete Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our full range of high-quality products, carefully curated for your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map(product => (
              <div key={product.id} className="bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-400 transition-all duration-500 hover:-translate-y-3 group">
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                     src={product.image} alt={product.title} className="w-full h-56 object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                    {/* Black screen overlay */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          View Details
                        </span>
                      </div>
                    </div>
                    {/* Dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <span className="text-yellow-500 mr-1 text-sm">★</span>
                      <span className="text-sm font-semibold text-gray-700">{product.rating.rate} ({product.rating.count})</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                      disabled={isInCart(product.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isInCart(product.id)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                      }`}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToWishlist(product)
                      }}
                      disabled={isInWishlist(product.id)}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        isInWishlist(product.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:shadow-lg transform hover:scale-110'
                      }`}
                    >
                      <FiHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
<FAQ/>
    </div>
  )
}

export default Dashboard