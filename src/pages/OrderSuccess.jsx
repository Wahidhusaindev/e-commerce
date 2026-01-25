import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { clearLastOrder } from '../redux/slices/paymentSlice'
import { FiCheckCircle, FiPackage, FiTruck, FiMail } from 'react-icons/fi'

const OrderSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { lastOrder } = useSelector(state => state.payment)

  useEffect(() => {
    if (!lastOrder) {
      navigate('/')
    }

    // Clear the last order after 5 minutes to prevent showing stale data
    const timer = setTimeout(() => {
      dispatch(clearLastOrder())
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearTimeout(timer)
  }, [lastOrder, navigate, dispatch])

  if (!lastOrder) {
    return null
  }

  const orderSteps = [
    {
      icon: FiCheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      completed: true
    },
    {
      icon: FiPackage,
      title: 'Order Processing',
      description: 'We\'re preparing your items',
      completed: true
    },
    {
      icon: FiTruck,
      title: 'Shipped',
      description: 'Your order is on its way',
      completed: false
    },
    {
      icon: FiMail,
      title: 'Delivered',
      description: 'Package delivered to your address',
      completed: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Order ID:</span>
                <span className="ml-2 text-gray-900">{lastOrder.orderId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Transaction ID:</span>
                <span className="ml-2 text-gray-900">{lastOrder.transactionId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Order Date:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(lastOrder.timestamp || lastOrder.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className="ml-2 text-green-600 font-medium">{lastOrder.status}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {lastOrder.items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <img 
                  src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">× {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${lastOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{lastOrder.shipping === 0 ? 'Free' : `$${lastOrder.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${lastOrder.tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {lastOrder.shippingInfo.firstName} {lastOrder.shippingInfo.lastName}
            </p>
            <p>{lastOrder.shippingInfo.address}</p>
            <p>{lastOrder.shippingInfo.city}, {lastOrder.shippingInfo.zipCode}</p>
            <p>{lastOrder.shippingInfo.country}</p>
            <p className="mt-2">{lastOrder.shippingInfo.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>
          <div className="space-y-4">
            {orderSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                  step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {step.completed && (
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-x-4">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 font-medium"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess