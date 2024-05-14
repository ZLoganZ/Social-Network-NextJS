'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaPencilAlt } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import {
  IoCamera,
  IoChatboxEllipsesOutline,
  IoChevronDown,
  IoEllipsisHorizontal,
  IoFlagOutline,
  IoImageOutline,
  IoShareOutline,
  IoStopCircleOutline,
  IoVideocamOutline
} from 'react-icons/io5';
import { CircularProgress } from '@mui/material';

import { Link } from '@/navigation';
import { TabTitle, Tabs } from '@/components/ui/tabs';
import { useCurrentUserInfo, useOtherUserInfo, useUserPostsData } from '@/hooks/query';
import { Button } from '@/components/ui/button';
import { cn, getImageURL } from '@/lib/utils';
import FriendButton from './FriendButton';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProfileUpload } from '@/components/ui/upload-image';
import { showErrorToast, showSuccessToast } from '@/components/ui/toast';
import { imageService } from '@/services/ImageService';
import { useDeleteImage, useUpdateUser } from '@/hooks/mutation';

export interface ICoverProps {
  profileID: string;
}

export default function Cover({ profileID }: ICoverProps) {
  const t = useTranslations();
  const { mutateUpdateUser } = useUpdateUser();
  const { mutateDeleteImage } = useDeleteImage();

  const { otherUserInfo, isLoadingOtherUserInfo } = useOtherUserInfo(profileID);
  const { currentUserInfo } = useCurrentUserInfo();
  const { userPosts } = useUserPostsData(profileID);

  const isMe = currentUserInfo._id === profileID;

  const isFriend = currentUserInfo.friends?.some((friend) => friend._id === profileID);

  useEffect(() => {
    UIkit.sticky('#profile-tabs')?.$emit('update');
  }, [userPosts]);
  const [isLoadingChangeCover, setIsLoadingChangeCover] = useState<boolean>(false);
  const [cover, setCover] = useState('/images/avatars/profile-cover.jpg');
  const [fileCover, setFileCover] = useState<File>();


  const handleCoverImage = useCallback((image: File) => {
    if (!image) return;
    setCover(URL.createObjectURL(image));
    setFileCover(image);
  }, []);

  const [openChangeAvatar, setOpenChangeAvatar] = useState(false);

  const [avatar, setAvatar] = useState('');
  const [fileAvatar, setFileAvatar] = useState<File>();

  useEffect(() => {
    if (currentUserInfo?.user_image) {
      setAvatar(getImageURL(currentUserInfo.user_image));
    }
    if (currentUserInfo?.cover_image) {
      setCover(getImageURL(currentUserInfo.cover_image));
    }
  }, [currentUserInfo]);

  const [isLoadingChangeAvatar, setIsLoadingChangeAvatar] = useState(false);
  const isChangedAvatar = useMemo(() => {
    return !fileAvatar;
  }, [fileAvatar]);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await imageService.uploadImage(formData);
    return {
      url: data.metadata,
      status: 'done'
    };
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (fileAvatar) {
      setIsLoadingChangeAvatar(true);
      const res = await handleUploadImage(fileAvatar);
      formData.append('userImage', res.url.key);
      // if (initialAvatar) await handleRemoveImage(initialAvatar);
    }

    if (fileCover) {
      setIsLoadingChangeCover(true);
      const res = await handleUploadImage(fileCover);
      formData.append('coverImage', res.url.key);
    }

    const oldAvatar = currentUserInfo.user_image;
    const oldCover = currentUserInfo.cover_image;

    mutateUpdateUser({
      user_image: formData.get('userImage')?.toString(),
      cover_image: formData.get('coverImage')?.toString(),
    },
      {
        onSuccess() {
          showSuccessToast(t('Your profile has been updated successfully!'));
          fileAvatar && (mutateDeleteImage([oldAvatar]));
          fileCover && (mutateDeleteImage([oldCover]));
          setFileAvatar(undefined);
          setFileCover(undefined);
          setOpenChangeAvatar(false);

        },
        onError() {
          showErrorToast(t('Something went wrong! Please try again!'));
        },
        onSettled() {
          setIsLoadingChangeAvatar(false);
          setIsLoadingChangeCover(false);
        }
      });
  };

  return (
    <>
      {isLoadingOtherUserInfo ? (
        <></>
      ) : (
        <div>
          <div className='relative overflow-hidden w-full lg:h-72 h-48'>
            <Image
              width={1000}
              height={1000}
              src={cover}
              alt=''
              className='h-full w-full object-cover inset-0'
              priority
            />
            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-20 z-10' />

            {isMe && (
              <div className='absolute bottom-0 right-0 m-4 z-20'>
                <div className='flex items-center gap-3'>
                  <label htmlFor='cover_image' className='cursor-pointer'>
                    <div className='button bg-black/10 text-white flex items-center gap-2 backdrop-blur-sm'>
                      {t('Edit')}
                    </div>
                    <input
                      type='file'
                      id='cover_image'
                      className='hidden'
                      accept='image/*'
                      disabled={isLoadingChangeCover}
                      onChange={(e) => handleCoverImage(e.currentTarget.files?.[0]!)}
                    />
                  </label>
                  {fileCover && (
                    <>
                      <Button
                        variant={'destructive'}
                        onClick={() => {
                          setCover(getImageURL(currentUserInfo.cover_image) || '/images/avatars/profile-cover.jpg');
                          setFileCover(undefined);
                        }}
                        className='button'
                        disabled={isLoadingChangeCover}>
                        {t('Cancel')}
                      </Button>
                      <Button
                        onClick={onSubmit}
                        className={cn('button', isLoadingChangeCover && 'select-none')}
                        disabled={isLoadingChangeCover}>
                        {isLoadingChangeCover && <CircularProgress size={15} className='!text-text-1 mr-2' />}
                        {t('Save')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='p-3'>
            <div className='flex flex-col justify-center md:items-center lg:-mt-48 -mt-28'>
              <div className='relative lg:size-48 size-28 mb-4 z-10'>
                <div className='relative overflow-hidden h-full w-full rounded-full md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900 shadow'>
                  <Image
                    width={500}
                    height={500}
                    src={getImageURL(avatar) || '/images/avatars/avatar-6.jpg'}
                    alt=''
                    className='lg:size-48 size-28 object-cover'
                    priority
                  />
                </div>
                {isMe && (<>
                  <button
                    type='button'
                    onClick={() => setOpenChangeAvatar(true)}
                    className='absolute -bottom-3 left-1/2 -translate-x-1/2 bg-hover-1 shadow p-1.5 rounded-full sm:flex hidden'>
                    <IoCamera className='text-2xl md hydrated' aria-label='camera' />
                  </button>
                  <Dialog open={openChangeAvatar} onOpenChange={setOpenChangeAvatar}>
                    <DialogContent className='bg-background-1 max-w-[600px] border-none'>
                      <DialogHeader>
                        <DialogTitle>{t('Change your avatar')}</DialogTitle>
                      </DialogHeader>
                      <ProfileUpload fieldChange={setFileAvatar} mediaURL={avatar} />
                      <DialogFooter>
                        <Button
                          variant={'destructive'}
                          className='button lg:px-6 text-white max-md:flex-1'
                          onClick={() => setOpenChangeAvatar(false)}>
                          {t('Cancel')}
                        </Button>
                        <Button
                          className='button lg:px-6 text-white max-md:flex-1'
                          onClick={onSubmit}
                          disabled={isChangedAvatar || isLoadingChangeAvatar}>
                          {isLoadingChangeAvatar && (
                            <CircularProgress size={20} className='!text-text-1 mr-2' />
                          )}
                          {t('Save')}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
                )}
              </div>
              <h3 className='md:text-3xl text-base font-bold text-text-1'>{otherUserInfo?.name}</h3>
              <p
                className='mt-2 max-w-xl text-sm md:font-normal font-light text-center'
                dangerouslySetInnerHTML={{ __html: otherUserInfo?.about }}></p>
            </div>
          </div>
          <div
            id='profile-tabs'
            className='flex items-center justify-between mt-3 border-t border-gray-100 px-2 max-lg:flex-col dark:border-slate-700'
            data-uk-sticky='start: 100; offset: 50; cls-active: bg-foreground-1 shadow rounded-b-2xl backdrop-blur-xl z-10; animation: uk-animation-slide-top; media: 1024'>
            <div className='flex items-center gap-2 text-sm py-2 pr-1 max-md:w-full lg:order-2'>
              {isMe && (
                <Button
                  variant='main'
                  className='button bg-foreground-2 hover:bg-hover-2 text-text-1 py-2 px-3.5 max-md:flex-1'>
                  <Link href={'/edit-profile'} className='flex items-center gap-2'>
                    <FaPencilAlt className='text-lg' />
                    <span className='text-sm'> {t('Edit Profile')} </span>
                  </Link>
                </Button>
              )}

              {!isMe && <FriendButton profileID={profileID} />}

              <div>
                <Button
                  variant='main'
                  className='rounded-lg bg-foreground-2 hover:bg-hover-2 flex px-2.5 py-2'>
                  <IoEllipsisHorizontal className='text-xl' />
                </Button>
                <div
                  className='w-[240px] !bg-foreground-1 hidden'
                  data-uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10'>
                  {isMe ? (
                    <nav>
                      <Link href='' className='hover:!bg-hover-1'>
                        {t('Activity Log')}
                      </Link>
                      <Link href='' className='hover:!bg-hover-1'>
                        {t('Archive')}
                      </Link>
                      <Link href='' className='hover:!bg-hover-1'>
                        {t('More')}
                      </Link>
                      <hr />
                      <Link href='' className='hover:!bg-hover-1'>
                        {t('Settings & Privacy')}
                      </Link>
                      <Link href='' className='hover:!bg-hover-1'>
                        {t('Help & Support')}
                      </Link>
                    </nav>
                  ) : (
                    <nav>
                      {isFriend && (
                        <>
                          <Link href='' className='hover:!bg-hover-1'>
                            <FiPhone className='text-xl' /> {t('Voice Call')}
                          </Link>
                          <Link href='' className='hover:!bg-hover-1'>
                            <IoVideocamOutline className='text-xl' />
                            {t('Video Call')}
                          </Link>
                        </>
                      )}
                      <Link href='' className='hover:!bg-hover-1'>
                        <IoChatboxEllipsesOutline className='text-xl' />
                        {t('Message')}
                      </Link>
                      <Link href='' className='hover:!bg-hover-1'>
                        <IoFlagOutline className='text-xl' /> {t('Report')}
                      </Link>
                      <Link href='' className='hover:!bg-hover-1'>
                        <IoShareOutline className='text-xl' />
                        {t('Share profile')}
                      </Link>
                      <hr />
                      <Link href='' className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'>
                        <IoStopCircleOutline className='text-xl' /> {t('Block')}
                      </Link>
                    </nav>
                  )}
                </div>
              </div>
            </div>

            <nav className='flex rounded-xl -mb-px font-medium text-[15px]'>
              <Tabs id='tabs-profile' navClassName='!pt-0 !rounded-sm' disableChevron>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Timeline')}</TabTitle>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Friends')}</TabTitle>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Series')}</TabTitle>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Photos')}</TabTitle>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Repositories')}</TabTitle>
                <TabTitle className='hover:bg-hover-1 !rounded-sm'>{t('Groups')}</TabTitle>
              </Tabs>

              {/* <!-- dropdown --> */}
              <div>
                <Link
                  href=''
                  className='font-semibold hover:bg-hover-1 hover:text-blue-400 hover:rounded-sm inline-flex items-center gap-2 p-3 leading-8 -ml-2 select-none'>
                  {t('More')}
                  <IoChevronDown />
                </Link>
                <div
                  className='md:w-[240px] w-screen !bg-foreground-1 hidden'
                  data-uk-dropdown='pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:-4'>
                  <nav className='text-[15px]'>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Likes')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Music')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Events')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Books')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Reviews given')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Groups')}
                    </Link>
                    <Link href='' className='hover:!bg-hover-1'>
                      {t('Manage Sections')}
                    </Link>
                  </nav>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
