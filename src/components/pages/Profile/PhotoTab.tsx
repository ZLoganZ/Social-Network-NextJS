'use client';

import Nodata from '@/components/shared/Nodata';
import { useGetAllImages } from '@/hooks/query';
import { getImageURL } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ImageGallery from '@/components/shared/ImageGallery';
import { PhotoView } from 'react-photo-view';
import PhotoProvider from '@/components/shared/PhotoProvider';
import 'react-photo-view/dist/react-photo-view.css';

export interface IPhotoTabProps {
  profileID: string;
}

export default function PhotoTab({ profileID }: IPhotoTabProps) {
  const { allImages, isLoadingAllImages } = useGetAllImages(profileID);
  const [visible, setVisible] = useState(false);

  return (
    <div className='bg-foreground-1 my-8 w-full rounded-md'>
      {allImages?.length <= 0 ? (
        <div className='w-full px-10 py-8 flex-center'>
          <Nodata width={150} height={150} title={'No image found'}></Nodata>
        </div>
      ) : (
        // <div className='w-full py-6 px-5'>
        //   <ImageGallery elementClassNames='all-image-post'>
        //     {allImages?.map((image, index) => (
        //       <Link
        //         key={index}
        //         href={getImageURL(image)}
        //         className='group relative h-40 w-full rounded-lg overflow-hidden bg-background-1'>
        //         <Image
        //           src={getImageURL(image)}
        //           className='w-full h-full object-cover img-responsive'
        //           width={1500}
        //           height={1500}
        //           alt=''
        //           priority
        //         />
        //       </Link>
        //     ))}
        //   </ImageGallery>
        // </div>
        <div className='flex-center flex-wrap px-10 py-8 gap-10 w-full'>
          <PhotoProvider images={allImages || []} visible={visible} onClose={() => setVisible(false)} />
          {allImages?.map((image, index) => (
            <div key={index} className='w-[calc(25%-2.5rem)] cursor-pointer' onClick={() => setVisible(true)}>
              <Image
                className='rounded-md w-full h-[150px] object-cover'
                src={getImageURL(image, 'post_mini')}
                alt='image'
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
