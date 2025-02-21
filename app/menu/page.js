"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [cartCoordinates, setCartCoordinates] = useState(null);
  const [flyingImage, setFlyingImage] = useState(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "main", name: "Main Course" },
    { id: "appetizer", name: "Appetizers" },
    { id: "dessert", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Fetching from local API
        const response = await fetch("/api/meals");
        const localData = await response.json();

        // Fetching random meals from external API
        const mealPromises = Array(5)
          .fill()
          .map(() =>
            fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
              (res) => res.json()
            )
          );
        const mealResults = await Promise.all(mealPromises);

        const formattedMeals = mealResults.map((result) => ({
          id: result.meals[0].idMeal,
          name: result.meals[0].strMeal,
          image: result.meals[0].strMealThumb,
          description:
            result.meals[0].strInstructions.substring(0, 100) + "...",
          price: (Math.random() * (25 - 10) + 10).toFixed(2),
          category: "special",
        }));

        setMenuItems([...localData, ...formattedMeals]);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();

    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setCartCoordinates({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      });
    }
  }, []);

  const handleAddToCart = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const start = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

    setFlyingImage({
      src: item.image,
      start,
      item,
    });

    setTimeout(() => {
      setFlyingImage(null);
    }, 1000);
  };

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#09122c] to-[#1a237e]">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/menu-hero.jpg"
          alt="Menu Background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-white text-center mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl text-center px-4"
          >
            Discover our carefully curated selection of delicious dishes
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-yellow-400 text-[#09122c] font-bold shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-2xl font-bold">
                      ${item.price}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className="bg-yellow-400 text-[#09122c] px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Flying Image Animation */}
      {flyingImage && cartCoordinates && (
        <motion.div
          initial={{
            x: flyingImage.start.x,
            y: flyingImage.start.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: cartCoordinates.x,
            y: cartCoordinates.y,
            scale: 0.1,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed z-50 w-20 h-20 rounded-full overflow-hidden pointer-events-none"
        >
          <Image src={flyingImage.src} alt="Flying item" fill className="object-cover" />
        </motion.div>
      )}
    </div>
  );
};

export default MenuPage;
