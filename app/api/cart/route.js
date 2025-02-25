import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const cartItems = await prisma.cartItem.findMany({
    where: { userId }
  });

  return NextResponse.json(cartItems);
}

export async function POST(request) {
  const { userId, items } = await request.json();
  
  // Delete existing items
  await prisma.cartItem.deleteMany({
    where: { userId }
  });

  // Create new items
  const createdItems = await prisma.cartItem.createMany({
    data: items.map(item => ({
      userId,
      mealId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }))
  });

  return NextResponse.json(createdItems);
}