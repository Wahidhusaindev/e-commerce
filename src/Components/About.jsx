import React from 'react'
import { FiAward, FiTrendingUp, FiUsers, FiHeart } from 'react-icons/fi'

const About = () => {
  const features = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Premium Quality",
      description: "We handpick every product to ensure the highest quality standards for our customers."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Best Prices",
      description: "Competitive pricing without compromising on quality. Get the best deals on all products."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. 24/7 customer support available."
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee. Easy returns and refunds within 30 days."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopX</h1>
          <p className="text-xl text-indigo-100">Your trusted destination for premium shopping experience</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Founded in 2020, ShopX started with a simple mission: to make premium shopping accessible to everyone. 
          We believed that quality products shouldn't come with a premium price tag, and exceptional customer service 
          should be the standard, not the exception.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Today, we've grown into a trusted e-commerce platform serving thousands of customers worldwide. Our commitment 
          to quality, affordability, and customer satisfaction remains unchanged. We continuously innovate to provide 
          you with the best shopping experience possible.
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose ShopX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="text-indigo-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Integrity</h3>
            <p className="text-gray-600">We believe in honest business practices and transparent dealings with our customers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Innovation</h3>
            <p className="text-gray-600">We constantly improve our platform and services to meet evolving customer needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Excellence</h3>
            <p className="text-gray-600">We strive for excellence in every aspect of our business and customer interactions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About