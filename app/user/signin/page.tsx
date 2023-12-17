'use client'

import Link from "next/link";

export default function SignupPage() {
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your signup logic here
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);

    try {
      await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        form.reset();  
        res.json()})

    } catch (error) {
      console.log(error);
      alert('something went wrong');
    }

  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded-md border p-2'
                placeholder='Enter your email'
              />
            </div>
           
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='email'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full rounded-md border p-2'
                placeholder='Enter password'
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='email'>
                Confirm password
              </label>
              <input
                type='password'
                id='confirm-password'
                name='confirm-password'
                className='w-full rounded-md border p-2'
                placeholder='Enter password'
              />
            </div>
           
            <button type='submit' className='rounded-md bg-success px-4 py-2 text-white hover:bg-blue-600'>
              Sign up
            </button>
            <p className="m-2"> 
Dont have an account?
            <Link href='/user/signin' className="text-success"> Sign up </Link>
            </p>
          </form>
    </div>
  );
};


