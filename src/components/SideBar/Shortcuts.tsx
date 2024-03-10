import Image from 'next/image';
import Link from 'next/link';

export default function Shortcuts() {
  return (
    <div className='font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800'>
      <div className='px-3 pb-2 text-sm font-medium'>
        <div className='text-black dark:text-white'>Shortcut</div>
      </div>
      <Link href='#'>
        <div className='flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery'>
          <Image
            src='/images/home/avatar-2.jpg'
            alt=''
            className='rounded-full object-cover'
            width={24}
            height={24}
          />
          <div>Marin Gray</div>
        </div>
      </Link>
      <Link href='#'>
        <div className='flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery'>
          <Image
            src='/images/home/avatar-7.jpg'
            alt=''
            className='rounded-full object-cover'
            width={24}
            height={24}
          />
          <div>Alexa Stella</div>
        </div>
      </Link>
      <Link href='#'>
        <div className='flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery'>
          <Image
            src='/images/home/avatar-3.jpg'
            alt=''
            className='rounded-full object-cover'
            width={24}
            height={24}
          />
          <div>Sarah Ali</div>
        </div>
      </Link>
    </div>
  );
}
