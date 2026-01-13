import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState([])

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset transition-colors duration-200 flex items-center justify-between"
          >
            <span className="text-lg font-medium text-gray-900">{item.title}</span>
            {openItems.includes(index) ? (
              <FiChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-4 text-gray-700 leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion