import { prisma } from '@/lib/prisma';
import ProductForm from './ProductForm';
import Image from 'next/image';
import ProductList from './components/productList';

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <main className='min-h-screen flex-col p-0 mx-auto items-center justify-between container bg-white'>
      <ProductList products={products} />
      <ProductForm />
    </main>
  );
}
