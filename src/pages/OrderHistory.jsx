import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi'

const OrderHistory = () => {
  const { orderHistory } = useSelector(state => state.payment)
  const { isAuthenticated } = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Order History</h1>
        <p className="text-gray-600 mb-8">Please log in to view your order history.</p>
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Log In
        </Link>
      </div>
    )
  }

  if (orderHistory.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <FiPackage className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your order history here!</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      <div className="space-y-6">
        {orderHistory.map((order, index) => (
          <div key={order.orderId || index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center gap-4 mb-4 lg:mb-0">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                  <FiPackage className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        {new Date(order.timestamp || order.orderDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiDollarSign className="w-4 h-4" />
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {order.items.slice(0, 3).map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain rounded-md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    +{order.items.length - 3} more items
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <p>Total Items: {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                  <p>Shipping to: {order.shippingInfo.city}, {order.shippingInfo.country}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory