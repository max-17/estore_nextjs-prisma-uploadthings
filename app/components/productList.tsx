'use client';
import { useState } from 'react';
import type { category, product } from '@prisma/client';
import { formatPrice } from '@/lib/utils';
import CheckoutForm from './checkoutForm';
import { ProductCard } from './ProductCard';

export default function ProductList({ products, categories }: { products: product[]; categories: category[] }) {
  const productsWithCartCount = products.map((item) => ({ ...item, cartCount: 0 }));
  //add cart count to every product| cartCount = 0
  const [items, setItems] = useState(productsWithCartCount);
  const [filter, setFilter] = useState<number | null>(null);

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.cartCount, 0);
  };

  const updateState = (item: { cartCount: number; id: number }) => {
    const { cartCount, id } = item;
    const updated = items.map((item) => (item.id === id ? { ...item, cartCount } : item));
    setItems(updated);
  };

  return (
    <>
      <div className='sticky top-0 bg-base-100 py-2 shadow-md shadow-[#0000005e]'>
        <h1 className='mb-3' hidden={!calculateTotal()}>
          {`Total price: ${formatPrice(calculateTotal())}`}
        </h1>
        <div className='flex flex-rows overflow-auto w-[500px] gap-1'>
          <input
            className='join-item btn'
            key='all'
            type='radio'
            name='options'
            aria-label='All'
            defaultChecked
            onChange={() => {
              setFilter(null);
            }}
          />
          {categories.map(({ id, name }) => (
            <input
              className='join-item btn'
              key={id}
              onChange={() => {
                setFilter(id);
              }}
              type='radio'
              name='options'
              aria-label={name}
            />
          ))}
        </div>
      </div>
      <br />
      <div className='grid grid-cols-2 max-w-screen-sm  mx-auto grid-flow-row gap-4 px-1 my-2 '>
        {items.map((product) => {
          const id = product.id;
          // if no filter return all products, if filter check categoryId===filter
          if (!filter || product.categoryId === filter)
            return (
              <ProductCard
                {...product}
                key={id}
                // cart count of a single product
                onChange={(cartCount) => updateState({ cartCount, id })}
              />
            );
        })}
      </div>
      {/*CheckoutForm is a Modal that recieves button (to open Modal), items (cart items) and onSuccess callback func as props */}
      <CheckoutForm
        items={items.filter((item) => item.cartCount > 0)}
        onSuccess={() => {
          setItems(productsWithCartCount);
        }}
        button={
          <button
            className='fixed w-[500px] bottom-0 bg-green-500 py-4 rounded-lg text-white'
            hidden={!calculateTotal()}
          >
            Buy
          </button>
        }
      />
    </>
  );
}
