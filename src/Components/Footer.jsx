import React from "react";
import { href, Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/" },
      { name: "Mens Cloths", href: "/mens-clothing" },
      { name: "Womens Cloths", href: "/womens-clothing" },
      { name: "New Arrivals", href: "/" },
      { name: "Best Sellers", href: "/" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/" },
      { name: "Shipping Info", href: "/" },
      { name: "Returns", href: "/" },
      { name: "Size Guide", href: "/" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Cookie Policy", href: "/" },
      { name: "Accessibility", href: "/" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: FiFacebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: FiTwitter,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: FiInstagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      icon: FiYoutube,
      href: "#",
      color: "hover:text-red-600",
    },
  ];

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: FiCreditCard,
      title: "Easy Returns",
      description: "30-day return policy",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 lg:space-x-4"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-xs lg:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 xl:col-span-2">
            <Link
              to="/"
              className="text-xl lg:text-2xl font-bold text-white mb-4 block hover:text-indigo-300 transition-colors duration-200"
            >
              ShopX
            </Link>
            <p className="text-gray-400 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
              Your one-stop destination for quality products. We offer a wide
              range of items with fast shipping, secure payments, and excellent
              customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 lg:space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs lg:text-sm leading-relaxed">
                  123 Commerce St, Shop City, SC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 shrink-0" />
                <span className="text-gray-400 text-xs lg:text-sm">
                  1-800-SHOPX-HELP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 shrink-0" />
                <span className="text-gray-400 text-xs lg:text-sm">
                  support@shopx.com
                </span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="sm:col-span-1">
            <h3 className="text-sm lg:text-lg font-semibold mb-3 lg:mb-4 text-white">
              Shop
            </h3>
            <ul className="space-y-1 lg:space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs lg:text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="sm:col-span-1">
            <h3 className="text-sm lg:text-lg font-semibold mb-3 lg:mb-4 text-white">
              Support
            </h3>
            <ul className="space-y-1 lg:space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs lg:text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="sm:col-span-1">
            <h3 className="text-sm lg:text-lg font-semibold mb-3 lg:mb-4 text-white">
              Company
            </h3>
            <ul className="space-y-1 lg:space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs lg:text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start space-x-3 lg:space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-xs lg:text-sm py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-end space-x-3 lg:space-x-4">
              <span className="text-gray-400 text-xs lg:text-sm mr-2">
                Follow us:
              </span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200 p-1`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-xs lg:text-sm">
              © {currentYear} ShopX. All rights reserved. Built with ❤️ for
              amazing shopping experiences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
