import { prisma } from '@/lib/prisma';
import ProductForm from './components/ProductForm';
import Image from 'next/image';
import ProductList from './components/productList';

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
