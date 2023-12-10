'use client';
import { useState } from 'react';
import type { product } from '@prisma/client';

export default function ProductList({ products }: { products: product[] }) {
  const productsWithCartCount = products.map((item) => ({ ...item, cartCount: 0 }));
  //add cart count to every product| cartCount = 0
  const [items, setItems] = useState(productsWithCartCount);

  // Function to add a product to the cart | cartCount + 1
  const addToCart = (id: number) => {
    setItems((items) => {
      console.log('state change +');
      //find the item with id from array and increment cartCount

      const updated = items.map((item) => (item.id === id ? { ...item, cartCount: item.cartCount + 1 } : item));
      return updated;
    });
  };

  const reduceFromCart = (id: number) => {
    setItems((items) => {
      console.log('state change -');

      // Use map to create a new array with the reduced quantity for the specific item
      const updatedItems = items.map((item) =>
        item.id === id && item.cartCount > 0 ? { ...item, cartCount: item.cartCount - 1 } : item
      );

      return updatedItems;
    });
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.cartCount, 0);
  };

  const getCartCount = (id: number) => items.find((item) => item.id === id)?.cartCount;

  return (
    <>
      <h1 className='mt-2' hidden={!calculateTotal()}>
        {`Total price: ${calculateTotal()} ₩`}
      </h1>
      <div className='grid grid-cols-2 place-items-center max-w-fit justify-items-center mx-auto grid-flow-row gap-4 px-1 mt-2'>
        {products.map(({ name, id, price, description, image }) => (
          <div className='rounded-md shadow-md w-full' key={id}>
            <div
              className='h-64 max-w-52 bg-cover bg-center bg-no-repeat rounded-t-md shadow-slate-300'
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className='flex justify-between m-2'>
              <p className=''>{name}</p>
              <p className='text-green-500'>{price} ₩</p>
            </div>
            <div className='mx-2 mb-2 text-slate-400 overflow-hidden block whitespace-pre'>{description}</div>
            <div className='flex flex-row gap-2 m-1'>
              <button className='bg-green-400 text-white px-4 rounded w-full' onClick={() => addToCart(id)}>
                {!getCartCount(id) ? 'add to cart' : ' + '}
              </button>
              <button
                className='bg-red-400 text-white px-4 rounded w-full'
                onClick={() => reduceFromCart(id)}
                hidden={!getCartCount(id)}
              >
                -
              </button>
              {Boolean(getCartCount(id)) && (
                <div
                  className='inline-flex items-center justify-center max-w-full px-2 ms-2 text-xs font-semibold bg-blue-200 rounded-full'
                  hidden={false}
                >
                  {getCartCount(id)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className='fixed w-full bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1.5'
        hidden={!calculateTotal()}
      >
        Buy Now
      </button>
    </>
  );
}
