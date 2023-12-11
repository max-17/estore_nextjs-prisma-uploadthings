'use client';
import { FormEvent, useRef, useState } from 'react';
import type { product } from '@prisma/client';
import { productsWithCartCount } from '../api/product/route';

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
      <h1 className='mt-2' hidden={!calculateTotal()}>
        {`Total price: ${calculateTotal()} ₩`}
      </h1>
      <div className='grid grid-cols-2 max-w-screen-sm  mx-auto grid-flow-row gap-4 px-1 my-2 '>
        {products.map(({ name, id, price, description, image }) => (
          <div className='rounded-md shadow-md shadow-slate-950 w-full max-w-2xl ' key={id}>
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
        ))}
      </div>

      {/* checkout */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id='my_modal_5' ref={modalRef} className='modal modal-bottom'>
        <div className='modal-box max-w-full w-full h-full'>
          <h3 className='font-bold text-lg'>Checkout</h3>
          <form onSubmit={handleCheckout}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-600'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='mt-1 p-2 w-full border rounded-md'
                placeholder='John Doe'
                required
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='mt-1 p-2 w-full border rounded-md'
                placeholder='john@example.com'
                required
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='address' className='block text-sm font-medium text-gray-600'>
                Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                className='mt-1 p-2 w-full border rounded-md'
                placeholder='South Korea, Busan, Sasang, Jurye-ro 47, Apartment, room 101'
                required
              />
            </div>
            <div className='grid grid-flow-col'>
              <div className='mb-4 w-full'>
                <label htmlFor='card' className='block text-sm font-medium text-gray-600'>
                  Credit Card Number
                </label>
                <input
                  type='number'
                  id='card'
                  name='card'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='**** **** **** ****'
                  pattern='[0-9]{16}'
                  required
                />
              </div>
              <div className='mb-4 w-fit'>
                <label htmlFor='cvv' className='block text-sm font-medium text-gray-600'>
                  cvv
                </label>
                <input
                  type='number'
                  id='cvv'
                  name='cvv'
                  className='mt-1 p-2 w-full border rounded-md'
                  placeholder='***'
                  pattern='[0-9]{3}'
                  required
                />
              </div>
            </div>

            <button type='submit' className='rounded-md bg-green-400 px-4 py-2 text-white hover:bg-blue-600'>
              Pay
            </button>
          </form>
          <div className='modal-action absolute top-0 right-0 m-0'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
            </form>
          </div>
        </div>
      </dialog>

      <button
        className='fixed w-full bottom-0 bg-green-500 py-4 rounded-lg text-white'
        hidden={!calculateTotal()}
        onClick={() => {
          modalRef.current?.showModal();
          console.log('botton click');
        }}
      >
        Buy Now
      </button>

      <br />
      <br />
    </>
  );
}
