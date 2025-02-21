"use client";
import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Image from 'next/image';
import { motion } from 'framer-motion';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'main', name: 'Main Course' },
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Classic Burger',
      category: 'main',
      price: 12.99,
      image: '/images/burger.jpg',
      description: 'Juicy beef patty with fresh vegetables and special sauce'
    },
    {
      id: 2, 
      name: 'Margherita Pizza',
      category: 'main',
      price: 14.99,
      image: '/images/pizza.jpg',
      description: 'Fresh tomatoes, mozzarella, and basil on crispy crust'
    },
    // Add more menu items as needed
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09122c] to-[#1a237e]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/menu-hero.jpg"
          alt="Menu Background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Our Menu
          </h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-[#09122c]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 text-xl font-bold">
                    ${item.price}
                  </span>
                  <button className="bg-yellow-400 text-[#09122c] px-4 py-2 rounded-full font-medium hover:bg-yellow-500 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
