'use client';
import { UploadButton } from '@/utils/uploadthing';
import { FormEvent, useRef, useState } from 'react';

export default function ProductForm({
  classes = 'indicator-item absolute badge right-10 badge-success btn btn-circle',
}: {
  classes?: string;
}) {
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data['image'] = imageUrl;

    // console.log(data);
    const res = await fetch('/api/product/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      form.reset();
      modalRef.current?.close();
    }
  };
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className={classes} onClick={() => modalRef.current?.showModal()}>
        <span className='text-4xl text-white align-middle m-auto'>+</span>
      </button>

      <dialog ref={modalRef} id='my_modal_1' className='modal modal-bottom'>
        <div className='modal-box max-w-full w-full h-full'>
          <h3 className='font-bold text-lg'>Product Form</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='name'>
                Product Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='w-full rounded-md border p-2'
                placeholder='Enter product name'
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='price'>
                Price
              </label>
              <input
                type='number'
                id='price'
                name='price'
                className='w-full rounded-md border p-2'
                placeholder='Enter price'
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='description'>
                Description
              </label>
              <input
                id='description'
                name='description'
                className='w-full rounded-md border p-2'
                placeholder='Enter product description'
              />
            </div>
            <div className='mb-4'>
              <p className='mb-2 block text-sm font-bold text-gray-700'>Image</p>
              <UploadButton
                appearance={{ button: { color: 'inherit' } }}
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                onUploadBegin={(name) => {
                  // Do something once upload begins
                  console.log('Uploading: ', name);
                }}
              />
            </div>
            <button type='submit' className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
              Submit
            </button>
          </form>
        </div>
        <div className='modal-action absolute top-0 right-0 m-0'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
