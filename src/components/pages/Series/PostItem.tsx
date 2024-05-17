import Modal from '@/components/shared/Modal';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { showErrorToast, showSuccessToast } from '@/components/ui/toast';
import { useDeleteImage, useDeletePostToSeries } from '@/hooks/mutation';
import { Link } from '@/navigation';
import { ISeriesPost, IUpdateSeriesPost } from '@/types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaPencilAlt, FaRegCircle } from 'react-icons/fa';
import CreateEditPostSeries from './CreateEditPostSeries';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@mui/material';
import { cn } from '@/lib/utils';
import { IoIosMore } from 'react-icons/io';

export interface IPostItemProps {
  post: ISeriesPost;
  series_id: string;
  isMe: boolean;
}

export function PostItem({ post, series_id, isMe }: IPostItemProps) {
  const t = useTranslations();

  const [openEditPost, setOpenEditPost] = useState(false);

  const { mutateDeletePostToSeries } = useDeletePostToSeries();
  const { mutateDeleteImage } = useDeleteImage();

  // Dialog Delete Post
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const handleOpenDeletePost = () => setOpenDeletePost(true);
  const handleCloseDeletePost = () => setOpenDeletePost(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeletePost = () => {
    setIsLoading(true);
    mutateDeletePostToSeries(
      { id: post._id, series_id },
      {
        onSuccess: () => {
          showSuccessToast(t('Post deleted successfully!'));
          mutateDeleteImage([post.cover_image]);
        },
        onError: () => {
          showErrorToast(t('Something went wrong! Please try again!'));
        },
        onSettled() {
          setIsLoading(false);
          handleCloseDeletePost();
        }
      }
    );
  };

  return (
    <div key={post._id} className='flex items-center w-full'>
      <FaRegCircle className='text-blue-500 size-3' />
      <div className='ms-3 text-text-2'>
        <div className='flex-start gap-3'>
          <Link
            href={`/series/${series_id}/posts/${post._id}`}
            className='h5-semibold  cursor-pointer'
          >
            {post.title}
          </Link>
          {isMe && (
            <div>
              <IoIosMore className='size-5 text-1 outline-none' />
              <div data-uk-drop='offset: 4; pos: right-right; mode: click; shift: false; flip: false; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right'>
                <div className='flex flex-col gap-0.5 p-1 bg-foreground-1 rounded-lg shadow-lg *:px-2.5 *:py-1.5 hover:*:!bg-hover-1 *:cursor-pointer *:rounded-lg *:uk-drop-close'>
                  <div>
                    <div
                      className='flex-start gap-2'
                      onClick={() => {
                        setOpenEditPost(true);
                      }}
                    >
                      <FaPencilAlt className='size-4 text-1' />
                      <span>{t('Edit')}</span>
                    </div>
                    <Modal
                      open={openEditPost}
                      handleClose={() => setOpenEditPost(false)}
                    >
                      <CreateEditPostSeries
                        handleClose={() => setOpenEditPost(false)}
                        series_id={series_id}
                        dataEdit={
                          {
                            id: post._id,
                            series_id: series_id,
                            title: post.title,
                            description: post.description,
                            cover_image: post.cover_image,
                            content: post.content,
                            read_time: post.read_time,
                            visibility: post.visibility
                          } as IUpdateSeriesPost
                        }
                      />
                    </Modal>
                  </div>
                  <AlertDialog
                    open={openDeletePost}
                    onOpenChange={setOpenDeletePost}
                  >
                    <AlertDialogTrigger
                      className='w-full text-1 uk-drop-close'
                      onClick={handleOpenDeletePost}
                    >
                      <div className='flex-start gap-2'>
                        <BiSolidTrashAlt className='size-5 text-1' />
                        <span>{t('Delete')}</span>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t('Are you absolutely sure delete this post?')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t(
                            'You will not be able to recover post after deletion!'
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button
                          variant='destructive'
                          className={cn(isLoading && 'select-none')}
                          disabled={isLoading}
                          onClick={handleCloseDeletePost}
                        >
                          {t('Cancel')}
                        </Button>
                        <Button
                          className={cn(isLoading && 'select-none')}
                          disabled={isLoading}
                          onClick={handleDeletePost}
                        >
                          {isLoading && (
                            <CircularProgress
                              size={20}
                              className='!text-text-1 mr-2'
                            />
                          )}
                          {t('Delete')}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className='small-regular'>{post.read_time + ' min read'}</p>
      </div>
    </div>
  );
}