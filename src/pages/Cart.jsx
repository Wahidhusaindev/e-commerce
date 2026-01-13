import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-indigo-600 font-bold">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="font-semibold min-w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items ({totalItems})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-md mt-6 hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart