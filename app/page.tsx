import { prisma } from '@/lib/prisma';
import ProductForm from './ProductForm';
import Image from 'next/image';

export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-black'>
      {products.map((product) => (
        <div key={product.id}>
          <Image src={product.image} height={100} width={100} alt='product image' />
          <p className='text-slate-200'>{product.name}</p>
        </div>
      ))}

      <ProductForm />
    </main>
  );
}
