'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FaImages } from 'react-icons/fa';
import { RiLiveFill } from 'react-icons/ri';

import { useOtherUserInfo } from '@/hooks/query';

export interface INewPostProps {
  profileID?: string;
}

export default function NewPost({ profileID }: INewPostProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const { otherUserInfo } = useOtherUserInfo(profileID || '');

  const isMe = session?.id === profileID;

  return (
    <div className='new-post px-4 py-5 bg-foreground-1 flex-between gap-1 rounded-lg'>
      <div
        className='text-center py-2 bg-foreground-2 basis-9/12 rounded-lg hover:bg-hover-2 cursor-pointer'
        data-uk-toggle='target: #create-status'
      >
        {profileID ? (
          <span>
            {isMe
              ? t('What do you have in mind?')
              : t('Write some thing for') + ' ' + otherUserInfo?.name + '...'}
          </span>
        ) : (
          <span> {t('What do you have in mind?')} </span>
        )}
      </div>
      <div
        className='basis-1/12 bg-blue-3 hover:bg-blue-4 flex-center py-2 rounded-lg duration-300 cursor-pointer'
        data-uk-toggle='target: #create-status'
      >
        <FaImages className='size-5 text-blue-1' />
      </div>
      <div
        className='basis-1/12 bg-pink-3 hover:bg-pink-4 flex-center py-2 rounded-lg duration-300 cursor-pointer'
        data-uk-toggle='target: #create-status'
      >
        <RiLiveFill className='size-5 text-pink-1' />
      </div>
    </div>
  );
}