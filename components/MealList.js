'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagIcon, FireIcon, GiftIcon, SparklesIcon } from '@heroicons/react/24/solid';

const AdvertisementPage = () => {
  const [selectedAd, setSelectedAd] = useState(null);

  const advertisements = [
    {
      id: 1,
      title: "Premium Family Package",
      description: "Luxury dining experience for the whole family. Premium ingredients, expert chefs.",
      discount: "30% OFF",
      originalPrice: 129.99,
      discountedPrice: 90.99,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["Premium", "Family", "Limited Time"]
    },
    {
      id: 2,
      title: "Executive Lunch Deal",
      description: "Gourmet business lunch with premium sides and beverages included",
      discount: "25% OFF",
      originalPrice: 49.99,
      discountedPrice: 37.49,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["Business", "Weekday Special"]
    },
    {
      id: 3,
      title: "Welcome Package",
      description: "Exclusive first-time order bundle with premium selections",
      discount: "40% OFF",
      originalPrice: 79.99,
      discountedPrice: 47.99,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["New Users", "Premium"]
    },
    {
      id: 4,
      title: "Gourmet Weekend Special",
      description: "Chef's special selection of premium dishes and wine pairings",
      discount: "20% OFF", 
      originalPrice: 89.99,
      discountedPrice: 71.99,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["Weekend", "Gourmet"]
    },
    {
      id: 5,
      title: "Corporate Event Package",
      description: "Premium catering package for corporate events and meetings",
      discount: "15% OFF",
      originalPrice: 299.99,
      discountedPrice: 254.99,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["Corporate", "Events"]
    },
    {
      id: 6,
      title: "Seasonal Tasting Menu",
      description: "Limited edition seasonal menu featuring local ingredients",
      discount: "25% OFF",
      originalPrice: 69.99,
      discountedPrice: 52.49,
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800",
      tags: ["Seasonal", "Limited Edition"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Featured Promotions
          </h1>
          <p className="text-gray-300 text-xl">
            Exclusive deals and premium dining experiences await
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {advertisements.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                className="bg-slate-800/50 backdrop-blur rounded-3xl shadow-xl overflow-hidden group border border-slate-700/50"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {ad.discount}
                    </span>
                  </div>
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{ad.title}</h3>
                  <p className="text-gray-400 mb-4">{ad.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {ad.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-700/50 text-amber-400 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        <SparklesIcon className="w-4 h-4" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-gray-500 line-through text-lg">${ad.originalPrice}</span>
                      <span className="text-2xl font-bold text-amber-400 ml-2">${ad.discountedPrice}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Until {new Date(ad.validUntil).toLocaleDateString()}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAd(ad)}
                    className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FireIcon className="w-5 h-5" />
                    Claim Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedAd(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Exclusive Offer</h3>
              <p className="text-gray-300 mb-6">
                Use code <span className="font-mono bg-slate-700 px-2 py-1 rounded text-amber-400">{`PREMIUM${selectedAd.id}`}</span> at checkout to redeem this offer.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedAd(null)}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvertisementPage;
