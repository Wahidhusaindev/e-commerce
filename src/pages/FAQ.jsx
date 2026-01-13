import React from 'react'
import { Link } from 'react-router-dom'
import Accordion from '../Components/Accordion.jsx'
import { FiHelpCircle, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi'

const FAQ = () => {
  const faqItems = [
    {
      title: "How do I place an order?",
      content: (
        <div>
          <p>To place an order:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Browse our products and click on any item to view details</li>
            <li>Select the quantity you want and click "Add to Cart"</li>
            <li>Review your cart and click "Proceed to Checkout"</li>
            <li>Fill in your shipping and payment information</li>
            <li>Review your order and click "Place Order"</li>
          </ol>
        </div>
      )
    },
    {
      title: "What payment methods do you accept?",
      content: (
        <div>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
            <li>PayPal</li>
            <li>Apple Pay and Google Pay</li>
            <li>Bank transfers for large orders</li>
          </ul>
          <p className="mt-2">All payments are processed securely through encrypted connections.</p>
        </div>
      )
    },
    {
      title: "How long does shipping take?",
      content: (
        <div>
          <p>Shipping times vary depending on your location:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Standard Shipping:</strong> 5-7 business days</li>
            <li><strong>Express Shipping:</strong> 2-3 business days</li>
            <li><strong>Overnight:</strong> 1 business day</li>
          </ul>
          <p className="mt-2">Free shipping is available on orders over $50. You'll receive a tracking number via email once your order ships.</p>
        </div>
      )
    },
    {
      title: "What is your return policy?",
      content: (
        <div>
          <p>We offer a 30-day return policy for most items:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Items must be in original condition and packaging</li>
            <li>Return shipping costs may apply unless the item is defective</li>
            <li>Refunds are processed within 5-7 business days after receipt</li>
            <li>Some items (electronics, personal care) may have restrictions</li>
          </ul>
          <p className="mt-2">Contact our customer service team to initiate a return.</p>
        </div>
      )
    },
    {
      title: "How do I track my order?",
      content: (
        <div>
          <p>You can track your order in several ways:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Check your order status in your account dashboard</li>
            <li>Use the tracking number provided in your shipping confirmation email</li>
            <li>Visit our Order History page to see all your past orders</li>
            <li>Contact customer service if you need assistance</li>
          </ul>
        </div>
      )
    },
    {
      title: "Are my payments secure?",
      content: (
        <div>
          <p>Yes, we take security very seriously:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>All payments are processed through SSL-encrypted connections</li>
            <li>We use industry-standard payment processors</li>
            <li>We never store your full credit card information</li>
            <li>PCI DSS compliant security measures are in place</li>
          </ul>
          <p className="mt-2">Your personal and payment information is always protected.</p>
        </div>
      )
    },
    {
      title: "Can I modify or cancel my order?",
      content: (
        <div>
          <p>Order modifications and cancellations:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Before shipping:</strong> You can modify or cancel your order by contacting us</li>
            <li><strong>After shipping:</strong> Returns are handled through our return policy</li>
            <li><strong>Processing time:</strong> Orders are typically processed within 1-2 business days</li>
          </ul>
          <p className="mt-2">Please contact customer service as soon as possible for any changes.</p>
        </div>
      )
    },
    {
      title: "Do you offer international shipping?",
      content: (
        <div>
          <p>Yes, we ship internationally to most countries:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>International shipping rates vary by destination</li>
            <li>Customs fees and import duties may apply</li>
            <li>Delivery times range from 7-21 business days</li>
            <li>Some restrictions may apply for certain products</li>
          </ul>
          <p className="mt-2">Check our shipping calculator at checkout for exact rates and delivery times.</p>
        </div>
      )
    },
    {
      title: "How do I create an account?",
      content: (
        <div>
          <p>Creating an account is easy:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Click the "Login" button in the top navigation</li>
            <li>Click "Create a new account" link</li>
            <li>Fill in your email, username, and password</li>
            <li>Verify your email address (if required)</li>
            <li>Start shopping with your new account!</li>
          </ol>
          <p className="mt-2">Accounts allow you to track orders, save favorites, and checkout faster.</p>
        </div>
      )
    },
    {
      title: "What should I do if I receive a damaged item?",
      content: (
        <div>
          <p>If you receive a damaged item:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Take photos of the damage and packaging</li>
            <li>Contact our customer service within 48 hours</li>
            <li>Provide your order number and photos</li>
            <li>We'll arrange for a replacement or refund</li>
            <li>Return shipping will be covered by us</li>
          </ol>
          <p className="mt-2">We're committed to ensuring you receive quality products.</p>
        </div>
      )
    }
  ]

  const contactOptions = [
    {
      icon: FiMail,
      title: "Email Support",
      description: "Send us an email anytime",
      contact: "support@shopx.com",
      action: "mailto:support@shopx.com"
    },
    {
      icon: FiPhone,
      title: "Phone Support",
      description: "Call us during business hours",
      contact: "1-800-SHOPX-HELP",
      action: "tel:1800766974357"
    },
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Chat with us online",
      contact: "Available 24/7",
      action: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
            <FiHelpCircle className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about shopping, shipping, and returns
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <Accordion items={faqItems} allowMultiple={false} />
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Still Need Help?</h2>
          <p className="text-center text-gray-600 mb-8">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                  <option.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <a
                  href={option.action}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {option.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200"
            >
              <span className="text-indigo-600 font-medium">Browse Products</span>
            </Link>
            <Link
              to="/cart"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200"
            >
              <span className="text-indigo-600 font-medium">View Cart</span>
            </Link>
            <Link
              to="/orders"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200"
            >
              <span className="text-indigo-600 font-medium">Order History</span>
            </Link>
            <Link
              to="/login"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors duration-200"
            >
              <span className="text-indigo-600 font-medium">My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ