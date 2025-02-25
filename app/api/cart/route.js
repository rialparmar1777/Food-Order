import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET cart items
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const cart = await prisma.cart.findMany({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// Update cart
export async function POST(req) {
  try {
    const { userId, items } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // First, delete existing cart items for this user
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: userId
        }
      }
    });

    // Then create new cart if it doesn't exist
    const cart = await prisma.cart.upsert({
      where: {
        userId: userId
      },
      update: {},
      create: {
        userId: userId
      }
    });

    // Add new items
    const cartItems = await Promise.all(
      items.map(item =>
        prisma.cartItem.create({
          data: {
            cartId: cart.id,
            mealId: item.idMeal,
            quantity: item.quantity,
            price: parseFloat(item.price),
            name: item.strMeal,
            image: item.strMealThumb
          }
        })
      )
    );

    return NextResponse.json({ cart, items: cartItems });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}