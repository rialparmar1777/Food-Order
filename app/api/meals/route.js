export async function GET(req) {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      if (!response.ok) throw new Error("Failed to fetch from the external API");
      const data = await response.json();
      
      // Categorize meals into starters, main courses, desserts, drinks
      const meals = data.meals.map((meal, index) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        description: meal.strInstructions.substring(0, 100) + "...",
        price: (Math.random() * (25 - 10) + 10).toFixed(2), // Random price
        category: index % 4 === 0 ? "starter" : index % 4 === 1 ? "mainCourse" : index % 4 === 2 ? "dessert" : "drink",
      }));
  
      // Split meals into categories
      const categorizedMeals = {
        starters: meals.filter(meal => meal.category === "starter"),
        mainCourses: meals.filter(meal => meal.category === "mainCourse"),
        desserts: meals.filter(meal => meal.category === "dessert"),
        drinks: meals.filter(meal => meal.category === "drink"),
      };
  
      return new Response(JSON.stringify(categorizedMeals), { status: 200 });
    } catch (error) {
      console.error("Error fetching meals:", error);
      return new Response("Failed to fetch meals", { status: 500 });
    }
  }
  