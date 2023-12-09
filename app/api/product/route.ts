import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  data.price = Number(data.price);

  console.log(data);

  const createProduct = await prisma.product.create({
    data,
  });

  return NextResponse.json(createProduct, { status: 201 });
}
