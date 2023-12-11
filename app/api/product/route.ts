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
  const updateProducts = async (data: productsWithCartCount[]) => {
    const updatedProducts = await Promise.all(
      data.map(async (product) => {
        try {
          const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: {
              sold: product.sold,
            },
          });

          return updatedProduct;
        } catch (error) {
          // Handle the error, e.g., log it or throw a custom error
          console.error(`Error updating product ${product.id}:`, error);
          throw error;
        }
      })
    );

    return updatedProducts;
  };

  const updated = updateProducts(data);

  console.log('updated---------------------', updated);

  return NextResponse.json(updated, { status: 201 });
}
