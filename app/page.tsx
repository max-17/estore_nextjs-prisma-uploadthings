export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import ProductForm from './components/ProductForm';
import Image from 'next/image';
import ProductList from './components/productList';
import { product } from '@prisma/client';

async function getData() {
  const products = await prisma.product.findMany();
  return products;
}

export default async function Home() {
  const products = await getData();
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
