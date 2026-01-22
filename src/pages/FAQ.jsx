import React from "react";
import { Link } from "react-router-dom";
import Accordion from "../Components/Accordion.jsx";
import { FiHelpCircle, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";

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
      ),
    },
    {
      title: "How long does shipping take?",
      content: (
        <div>
          <p>Shipping times vary depending on your location:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Standard Shipping:</strong> 5-7 business days
            </li>
            <li>
              <strong>Express Shipping:</strong> 2-3 business days
            </li>
            <li>
              <strong>Overnight:</strong> 1 business day
            </li>
          </ul>
          <p className="mt-2">
            Free shipping is available on orders over $50. You'll receive a
            tracking number via email once your order ships.
          </p>
        </div>
      ),
    },
    {
      title: "How do I track my order?",
      content: (
        <div>
          <p>You can track your order in several ways:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Check your order status in your account dashboard</li>
            <li>
              Use the tracking number provided in your shipping confirmation
              email
            </li>
            <li>Visit our Order History page to see all your past orders</li>
            <li>Contact customer service if you need assistance</li>
          </ul>
        </div>
      ),
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
          <p className="mt-2">
            We're committed to ensuring you receive quality products.
          </p>
        </div>
      ),
    },
  ];

  const contactOptions = [
    {
      icon: FiMail,
      title: "Email Support",
      description: "Send us an email anytime",
      contact: "support@shopx.com",
      action: "mailto:support@shopx.com",
    },
    {
      icon: FiPhone,
      title: "Phone Support",
      description: "Call us during business hours",
      contact: "1-800-SHOPX-HELP",
      action: "tel:1800766974357",
    },
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Chat with us online",
      contact: "Available 24/7",
      action: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
            <FiHelpCircle className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about shopping, shipping, and
            returns
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <Accordion items={faqItems} allowMultiple={false} />
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Still Need Help?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Can't find the answer you're looking for? Our customer service team
            is here to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
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
      </div>
    </div>
  );
};

export default FAQ;
