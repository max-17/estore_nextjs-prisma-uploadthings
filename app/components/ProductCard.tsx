'use client';

import { useEffect, useState } from 'react';

export const ProductCard = ({
  name,
  price,
  description,
  image,
  cartCount,
  onChange: changeCart,
}: {
  name: string;
  price: number;
  description: string;
  image: string;
  cartCount: number;
  onChange: (cartCount: number) => void;
}) => {
  return (
    <div className='rounded-md border border-gray-900 border-opacity-50 shadow-md shadow-slate-950 w-full'>
      <div
        className='h-64 bg-cover bg-center bg-no-repeat rounded-t-md '
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className='flex justify-between m-2'>
        <p className='text-white capitalize text-[1.3rem]'>{name}</p>
        <p className='text-green-500'>{price} ₩</p>
      </div>
      <div className='mx-2 mb-2 text-slate-400 overflow-hidden block whitespace-pre capitalize'>{description}</div>
      <div className='flex flex-row items-center gap-2 m-1'>
        <button className='bg-green-400 text-white px-4 py-2 rounded w-full' onClick={() => changeCart(cartCount + 1)}>
          {!cartCount ? 'add to cart' : ' + '}
        </button>
        <div className=' text-black bg-white rounded-full py-1 px-2' hidden={!cartCount}>
          {cartCount}
        </div>
        <button
          className='bg-red-400 text-white px-4 rounded py-2 w-full'
          onClick={() => changeCart(cartCount > 0 ? cartCount - 1 : 0)}
          hidden={!cartCount}
        >
          -
        </button>
      </div>
    </div>
  );
};
