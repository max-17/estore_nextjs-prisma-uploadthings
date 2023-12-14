'use client';
import { FormEvent, useRef, useState } from 'react';
import type { category, product } from '@prisma/client';
import { formatPrice } from '@/lib/utils';
import CheckoutForm from './checkoutForm';

export default function ProductList({ products, categories }: { products: product[]; categories: category[] }) {
  const productsWithCartCount = products.map((item) => ({ ...item, cartCount: 0 }));
  //add cart count to every product| cartCount = 0
  const [items, setItems] = useState(productsWithCartCount);
  const [filter, setFilter] = useState<number | null>(null);

  // Function to add a product to the cart | cartCount + 1
  const addToCart = (id: number) => {
    setItems((items) => {
      // console.log('state change +');
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

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = items.filter((item) => item.cartCount > 0);

    data.forEach((product) => {
      product.sold += product.cartCount;
    });

    // console.log(data);

    const res = await fetch('/api/product/', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      form.reset();
      setItems(productsWithCartCount);
      modalRef.current?.close();
    }
  };

  const modalRef = useRef<HTMLDialogElement>(null);

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
            onChange={() => {
              setFilter(null);
            }}
            type='radio'
            name='options'
            aria-label='All'
            defaultChecked
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
        {products.map(({ name, id, price, description, image, categoryId }) => {
          if (!filter || categoryId === filter)
            return (
              <div
                className='rounded-md border border-gray-900 border-opacity-50 shadow-md shadow-slate-950 w-full max-w-2xl '
                key={id}
              >
                <div
                  className='h-64 max-w-52 bg-cover bg-center bg-no-repeat rounded-t-md '
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className='flex justify-between m-2'>
                  <p className='text-white capitalize text-[1.3rem]'>{name}</p>
                  <p className='text-green-500'>{price} ₩</p>
                </div>
                <div className='mx-2 mb-2 text-slate-400 overflow-hidden block whitespace-pre capitalize'>
                  {description}
                </div>
                <div className='flex flex-row items-center gap-2 m-1'>
                  <button className='bg-green-400 text-white px-4 py-2 rounded w-full' onClick={() => addToCart(id)}>
                    {!getCartCount(id) ? 'add to cart' : ' + '}
                  </button>
                  {Boolean(getCartCount(id)) && (
                    <div className='badge text-black bg-white badge-lg'>{getCartCount(id)}</div>
                  )}{' '}
                  <button
                    className='bg-red-400 text-white px-4 rounded py-2 w-full'
                    onClick={() => reduceFromCart(id)}
                    hidden={!getCartCount(id)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
        })}
      </div>

      {/* checkout */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

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
