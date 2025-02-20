"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const MealListContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f4f4f9;
  border-radius: 15px;
`;

const MealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MealCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-bottom: 5px solid #ffd700;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const MealInfo = styled.div`
  padding: 1.5rem;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #ffd700;
    }
  }

  p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  .price {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffd700;
  }

  button {
    background: #ffd700;
    border: none;
    padding: 0.6rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #e6c200;
      transform: scale(1.1);
    }
  }
`;

const MealList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealPromises = Array(8).fill().map(() =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
        );
        const mealResults = await Promise.all(mealPromises);
        const formattedMeals = mealResults.map(result => ({
          id: result.meals[0].idMeal,
          name: result.meals[0].strMeal,
          image: result.meals[0].strMealThumb,
          description: result.meals[0].strInstructions.substring(0, 100) + '...',
          price: (Math.random() * (25 - 10) + 10).toFixed(2) // Random price between 10 and 25
        }));
        setMeals(formattedMeals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <MealListContainer id="menu">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Our Menu
      </motion.h2>
      <MealGrid>
        {meals.map((meal, index) => (
          <MealCard
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={meal.image} alt={meal.name} />
            <MealInfo>
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
              <PriceRow>
                <span className="price">${meal.price}</span>
                <button aria-label="Add to cart">
                  <FaShoppingCart size={20} color="#000" />
                </button>
              </PriceRow>
            </MealInfo>
          </MealCard>
        ))}
      </MealGrid>
    </MealListContainer>
  );
};

export default MealList;
