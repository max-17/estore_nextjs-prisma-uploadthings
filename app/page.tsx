export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

import ProductList from './components/productList';

async function getData() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  return { products, categories };
}

export default async function Home() {
  const { products, categories } = await getData();

  return (
    <>
      <div className='mt-4'>
        <ProductList {...{ products, categories }} />
      </div>
    </>
  );
}
