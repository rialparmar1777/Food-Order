const meals = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
      price: 14.99,
      image: "/images/margherita-pizza.jpg",
      category: "Pizza"
    },
    {
      id: 2,
      name: "Chicken Burger",
      description: "Grilled chicken breast with lettuce, tomato, and special sauce",
      price: 12.99,
      image: "/images/chicken-burger.jpg",
      category: "Burgers"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce, croutons, parmesan cheese with Caesar dressing",
      price: 9.99,
      image: "/images/caesar-salad.jpg",
      category: "Salads"
    },
    {
      id: 4,
      name: "Pasta Carbonara",
      description: "Spaghetti with creamy sauce, pancetta, and parmesan cheese",
      price: 16.99,
      image: "/images/pasta-carbonara.jpg",
      category: "Pasta"
    }
  ];
  
  export async function GET() {
    return new Response(JSON.stringify(meals), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }