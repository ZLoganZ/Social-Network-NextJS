import { cn } from '@/lib/utils';
import * as React from 'react';
import Link from 'next/link';
import { ClassValue } from 'clsx';
import Image from 'next/image';
import { Button } from '@mui/material';

export interface IRegisterFormProps {
  className: string;
}

const classStyleInput: ClassValue =
  'shadow-sm bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light placeholder:text-gray-900';

export default function RegisterForm(props: IRegisterFormProps) {
  return (
    <div className={cn(props.className, 'flex-center')}>
      <div className='w-full'>
        <div className='flex-center'>
          <div>
            <div className='flex-center'>
              <Image
                src='https://flowbite.com/images/logo.svg'
                width={36}
                height={36}
                alt='logo'
                priority
              />
              <span className='h2-bold text-text-1 ms-3'>Connectify</span>
            </div>
            <div className='h3-bold text-text-1 my-3'>Sign in to your account</div>
          </div>
        </div>
        <form>
          <div className='mb-5'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className={cn(classStyleInput)}
              placeholder='Your Email'
              autoComplete='one-time-code'
              required
            />
          </div>
          <div className='mb-5'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className={cn(classStyleInput)}
              placeholder='Your Password'
              autoComplete='one-time-code'
              required
            />
          </div>
          <Button className='w-full mb-5'>Sign in</Button>
        </form>
        <div className='max-w-sm flex-center'>
          <div className='flex-start'>
            <div className='me-2 text-text-1'>Dont have an account yet?</div>
            <Link
              href='/register'
              className='text-primary-800 dark:text-primary-500'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}