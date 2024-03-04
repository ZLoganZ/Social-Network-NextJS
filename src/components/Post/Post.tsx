import { Avatar } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import { GoShare } from 'react-icons/go';
import { IoHeart } from 'react-icons/io5';
import { FaCommentDots } from 'react-icons/fa';
import CommentList from '../CommentList/CommentList';
import InputComment from '../InputComment/InputComment';

export interface IPostProps {}

export default function Post(props: IPostProps) {
  return (
    <div className='post bg-foreground-1 rounded-lg p-4'>
      <div className='flex-between'>
        <div className='flex-start'>
          <Avatar src='assets/images/avatars/avatar-3.jpg' />
          <div className='flex flex-col ms-3'>
            <span className='base-bold'>Monroe Parker</span>
            <span className='small-bold text-text-2'>2 hours ago</span>
          </div>
        </div>
        <div className='p-1 rounded-full hover:bg-hover-1'>
          <IoIosMore className='size-6' />
        </div>
      </div>
      <div className='mt-4'>
        <Image
          className='rounded-lg'
          src='/assets/images/reels/reels-1.jpg'
          width={1000}
          height={1000}
          alt='image'
        />
      </div>
      <div className='react flex-between mt-4'>
        <div className='left flex gap-5'>
          <div className='flex gap-3'>
            <span className='p-1 bg-hover-1 rounded-full'>
              <IoHeart className='size-4 text-red-600 cursor-pointer' />
            </span>
            <span>1.380</span>
          </div>
          <div className='flex gap-3'>
            <span className='p-1 bg-hover-1 rounded-full'>
              <FaCommentDots className='size-4 cursor-pointer' />
            </span>
            <span>260</span>
          </div>
        </div>
        <div className='right flex-start gap-5'>
          <span>
            <FiSend className='size-5' />
          </span>
          <span>
            <GoShare className='size-5' />
          </span>
        </div>
      </div>
      <div className='comment-list mt-7'>
        <CommentList />
      </div>
      <div className='mt-8'>
        <InputComment />
      </div>
    </div>
  );
}