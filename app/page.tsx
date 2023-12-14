export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import ProductForm from './components/ProductForm';
import Image from 'next/image';
import ProductList from './components/productList';
import { product } from '@prisma/client';

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
        {/* categories */}

        {/* <div role='tablist' className='tabs tabs-bordered w-full'>
          <input type='radio' key='all' name='my_tabs_1' role='tab' className='tab' aria-label='All' defaultChecked />
          <div role='tabpanel' className='tab-content'>
            <ProductList products={products} />
          </div>
          {categories.map((category) => (
            <>
              <input
                type='radio'
                key={category.id}
                name='my_tabs_1'
                role='tab'
                className='tab'
                aria-label={category.name}
              />
              <div role='tabpanel' className='tab-content'>
                <ProductList products={products.filter((product) => product.categoryId === category.id)} />
              </div>
            </>
          ))}
        </div> */}
        {/* categories */}
        <ProductList {...{ products, categories }} />
      </div>
    </>
  );
}
