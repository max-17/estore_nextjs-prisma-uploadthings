import React, { FormEvent, useRef } from 'react';

import { productWithCartCount } from '../api/product/route';

// CheckoutForm is a Modal that recieves button (to open Modal), items (cart items) and onSuccess callback func as props

type Props = {
  items: productWithCartCount[];
  button: React.ReactElement<{ onClick: () => void }>;
  onSuccess: () => void;
};

function CheckoutForm({ items, button, onSuccess: sucessAction }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    items.forEach((item) => {
      if (item.cartCount) item.sold += item.cartCount;
    });

    const res = await fetch('/api/product/', {
      method: 'PUT',
      body: JSON.stringify(items),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      form.reset();
      sucessAction();
      modalRef.current?.close();
    }
  };

  return (
    <div className='max-w-md'>
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

      {button && React.cloneElement(button, { onClick: () => modalRef.current?.showModal() })}
    </div>
  );
}

export default CheckoutForm;
