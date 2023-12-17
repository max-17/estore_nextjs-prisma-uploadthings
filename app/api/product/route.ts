import { prisma } from '@/lib/prisma';
import { product, category } from '@prisma/client';
import { NextResponse } from 'next/server';

export type productWithCartCount = {
  cartCount?: number;
}& product;

// create a new product
export async function POST(req: Request) {
  const data = await req.json();
  //price and categoryId come as string from client
  data.price = Number(data.price);
  data.categoryId = Number(data.categoryId);

  console.log(data);

  const createProduct = await prisma.product.create({
    data,
  });

  return NextResponse.json(createProduct, { status: 201 });
}
export async function PUT(req: Request) {
  const data = await req.json();

  data.forEach((item: productWithCartCount) => {
    delete item.cartCount;
  });

  console.log(data);
  //this part not working
  const updateProducts = async (data: productWithCartCount[]) => {
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
