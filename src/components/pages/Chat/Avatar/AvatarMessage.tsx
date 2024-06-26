import { cn, getImageURL } from '@/lib/utils';
import { useSocketStore } from '@/store/socket';
import { IUserInfo } from '@/types';
import Image from 'next/image';

interface IAvatar {
  user: IUserInfo;
  size?: number;
}

const AvatarMessage: React.FC<IAvatar> = ({ size = 36, user }) => {
  const { activeMembers: members } = useSocketStore();
  const isActive = members.some((member) => member._id === user._id && member.is_online);

  return (
    <div className='relative' style={{ width: size, height: size }}>
      <div className='relative rounded-full overflow-hidden flex' style={{ width: size, height: size }}>
        <Image
          width={500}
          height={500}
          src={getImageURL(user.user_image, 'avatar')!}
          alt='Avatar'
          referrerPolicy='no-referrer'
          className='object-cover w-full h-full'
          priority
        />
      </div>
      {isActive && (
        <span
          className={cn(
            'absolute block rounded-full bg-green-500 ring-white top-0 right-0',
            size / 4 < 20 ? 'ring-2' : 'ring-4'
          )}
          style={{ width: size / 4, height: size / 4 }}
        />
      )}
    </div>
  );
};

export default AvatarMessage;
