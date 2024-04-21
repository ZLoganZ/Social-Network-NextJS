'use client';

import Nodata from '@/components/shared/Nodata';
import { Button } from '@/components/ui/button';
import { useAddFriendUser, useDeleteFriendUser } from '@/hooks/mutation';
import { useCurrentUserInfo, useOtherUserInfo } from '@/hooks/query';
import { getImageURL } from '@/lib/utils';
import { IUserInfo } from '@/types';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IRenderFriendItemProps {
  friend: IUserInfo;
}

function RenderFriendItem({ friend }: IRenderFriendItemProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const { currentUserInfo } = useCurrentUserInfo(session?.id || '');
  const [isFriend, setIsFriend] = useState(false);
  const { mutateAddFriendUser } = useAddFriendUser();
  const { mutateDeleteFriendUser } = useDeleteFriendUser();

  useEffect(() => {
    setIsFriend(currentUserInfo?.friends.some(item => item._id === friend._id));
  }, [currentUserInfo?.friends]);

  if(friend?._id == currentUserInfo?._id) return null;

  return (
    <div className='flex-between'>
      <div className='flex-start'>
        <Image
          src={getImageURL(friend?.user_image, 'avatar')}
          alt={friend?.name}
          className='rounded-full w-10 h-10'
          width={40}
          height={40}
        />
        <div className='ml-3'>
          <div>{friend.name}</div>
          {friend?.experiences?.length > 0 && (
            <span className='small-regular text-text-2 mt-1'>
              Work at
              <span className='mx-1 small-bold'>
                {friend?.experiences[0]?.company_name}
              </span>
              as a
              <span className='mx-1 small-bold'>
                {friend?.experiences[0]?.position_name}
              </span>
            </span>
          )}
        </div>
      </div>
      {isFriend ? (
        <Button
          variant={'main'}
          onClick={() => {
            setIsFriend(!isFriend);
            mutateDeleteFriendUser(friend._id);
          }}
        >
          {t('Unfriend')}
        </Button>
      ) : (
        <Button
          variant={'main'}
          onClick={() => {
            setIsFriend(isFriend);
            mutateAddFriendUser(friend._id);
          }}
        >
          {t('Add Friend')}
        </Button>
      )}
    </div>
  );
}

export interface IFriendTabProps {
  profileID: string;
}

export default function FriendTab({ profileID }: IFriendTabProps) {
  const { otherUserInfo, isLoadingOtherUserInfo } = useOtherUserInfo(profileID);

  return (
    <>
      {isLoadingOtherUserInfo ? (
        <>Loading...</>
      ) : (
        <div className='bg-foreground-1 my-8 w-full rounded-md'>
          {otherUserInfo?.friends.length <= 0 ? (
            <div className='w-full px-10 py-8 flex-center'>
              <Nodata
                width={150}
                height={150}
                title={'No friend found'}
              ></Nodata>
            </div>
          ) : (
            <div className='flex-between flex-wrap px-10 py-8 gap-10 w-full'>
              {otherUserInfo?.friends.map((friend, index) => (
                <div className='w-[calc(50%-2.5rem)]' key={index}>
                  <RenderFriendItem friend={friend} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}