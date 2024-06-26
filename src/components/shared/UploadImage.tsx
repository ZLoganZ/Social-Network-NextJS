import { getImageURL } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { IoImage } from 'react-icons/io5';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { showErrorToast } from '../ui/toast';

export interface IUploadImageProps {
  imagesOfPost?: string[];
  setImagesOfPost?: (images: string[]) => void;
  setImagesOfS3: (images: File[]) => void;
}

export default function UploadImage({ imagesOfPost, setImagesOfPost, setImagesOfS3 }: IUploadImageProps) {
  const t = useTranslations();

  const [imagesPost, setImagesPost] = useState<string[]>(imagesOfPost || []);
  const [images, setImages] = useState<ImageListType>([]);

  const maxNumber = 10;
  const [currentNumber, setCurrentNumber] = useState<number>(imagesPost.length + images.length);

  useEffect(() => {
    setImagesOfPost && setImagesOfPost(imagesPost);
    const files = images.map((image) => image.file);
    setImagesOfS3(files as File[]);
  }, [imagesPost, images]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
    setCurrentNumber(imagesPost.length + imageList.length);
  };

  const convertByte = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber - imagesPost.length}
        dataURLKey='data_url'
        onError={(e) => {
          if (e) {
            if (e.maxNumber) {
              showErrorToast(t('You can only upload 10 images at a time!'));
            }
            if (e.maxFileSize) {
              showErrorToast(t('Your image is too big!'));
            }
            if (e.acceptType) {
              showErrorToast(t('Your file type is not allowed!'));
            }
          }
        }}
        maxFileSize={1024 * 1024 * 3}
        acceptType={['jpg', 'jpeg', 'png', 'gif']}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            <div className='flex-start gap-3'>
              <button
                type='button'
                className='flex items-center gap-1.5 bg-sky-50 hover:bg-sky-200 text-sky-600 rounded-full py-1 px-2 border-2 border-sky-100 dark:bg-sky-950 dark:hover:bg-sky-900 dark:border-sky-900 duration-300'
                onClick={onImageUpload}>
                <IoImage className='text-base' />
                {t('Image')}
              </button>
              <div>
                {t('Quantity')} {': '} {currentNumber + '/' + maxNumber}
              </div>
              {(images.length > 0 || imagesPost.length > 0) && (
                <button
                  className='text-1 flex-start py-1 px-2 rounded-full'
                  onClick={() => {
                    onImageRemoveAll();
                    setImagesPost([]);
                  }}>
                  <span>{t('Remove all')}</span>
                  <IoCloseOutline className='size-5' />
                </button>
              )}
            </div>
            <div className='mt-4 ms-2 *:mb-3'>
              {imageList.toReversed().map((image, index) => (
                <div key={index} className='image-item flex-start'>
                  <Image
                    src={image.data_url}
                    onError={() => {
                      onImageRemove(imageList.length - index - 1);
                    }}
                    className='me-3 w-[50px] h-[50px] rounded-md object-contain'
                    alt='image'
                    width={300}
                    height={300}
                  />
                  <div className='flex-start gap-3'>
                    <div className='image-item__btn-wrapper flex flex-col gap-2'>
                      <div>
                        {
                          // max 30 characters + '...' + file extension
                          (image.file?.name.length as number) > 33
                            ? `${image.file?.name.slice(0, 30)}... ${image.file?.name.slice(
                                image.file?.name.length - 4
                              )}`
                            : image.file?.name
                            ? image.file?.name
                            : ''
                        }
                      </div>
                      <div className='text-text-2'>{convertByte(image.file?.size || 0) || ''}</div>
                    </div>
                    <div className='image-item__btn-wrapper flex flex-col gap-2 *:p-1 *:text-1'>
                      <button onClick={() => onImageUpdate(index)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => onImageRemove(imageList.length - index - 1)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 ms-2 *:mb-3'>
              {imagesPost.toReversed().map((image, index) => (
                <div key={index} className='image-item flex-start'>
                  <Image
                    src={getImageURL(image, 'post_mini')}
                    className='me-3 w-[50px] h-[50px] rounded-md object-cover'
                    alt='image'
                    width={300}
                    height={300}
                  />
                  <div className='flex-start gap-3'>
                    <div className='image-item__btn-wrapper flex flex-col gap-2'>
                      <div>
                        {
                          // max 30 characters + '...' + file extension
                          (image.length as number) > 33
                            ? `${image.slice(0, 30)}... ${image.slice(image.length - 4)}`
                            : image
                            ? image
                            : ''
                        }
                      </div>
                    </div>
                    <div className='image-item__btn-wrapper flex flex-col gap-2 *:p-1 *:text-1'>
                      <button
                        onClick={() => {
                          setImagesPost(
                            imagesPost
                              .toReversed()
                              .filter((_, indexPost) => indexPost !== index)
                              .toReversed()
                          );
                          setCurrentNumber(currentNumber - 1);
                        }}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
