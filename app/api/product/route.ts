import { prisma } from '@/lib/prisma';
import { product } from '@prisma/client';
import { NextResponse } from 'next/server';

export type productsWithCartCount = {
  cartCount?: number;
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  sold: number;
};

export async function POST(req: Request) {
  const data = await req.json();
  //price comes as string from client
  data.price = Number(data.price);

  console.log(data);

  const createProduct = await prisma.product.create({
    data,
  });

  return NextResponse.json(createProduct, { status: 201 });
}
export async function PUT(req: Request) {
  const data = await req.json();

  data.forEach((item: productsWithCartCount) => {
    delete item.cartCount;
  });

  console.log(data);
  //this part not working
  const updated = data.forEach(async (product: product) => {
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        sold: product.sold,
      },
    });
    return updatedProduct;
  });

  console.log('updated---------------------', updated);

  return NextResponse.json(updated, { status: 201 });
}
