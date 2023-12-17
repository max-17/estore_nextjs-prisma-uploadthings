export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

import ProductList from './components/productList';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

async function getData() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();
  return { products, categories};
}

export const getSession = async () =>  await getServerSession(options)


export default async function Home() {
const session = await getSession()

  if (!session) {
    return redirect('/user/auth')
  }
  const { products, categories } = await getData();

  return (
    <>
      <div className='mt-4'>
        <ProductList {...{ products, categories }} />
      </div>
    </>
  );
}
