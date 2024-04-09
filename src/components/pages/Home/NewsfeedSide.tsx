'use client';

import SuggestFollow from './SuggestFollow';
import OnlineFriend from './OnlineFriend';
import ProMember from './ProMember';
import TrendForYou from './TrendForYou';
import SideSkeleton from '@/components/shared/SideSkeleton';
import { useAllNewsfeedPostsData } from '@/hooks/query';

export default function NewsfeedSide() {
  const { isLoadingAllNewsfeedPosts: isLoading } = useAllNewsfeedPostsData();

  return (
    <div className='more-info w-2/5 max-lg:hidden'>
      {isLoading ? (
        <SideSkeleton />
      ) : (
        <div className='space-y-6 pb-8' data-uk-sticky='media: 1024; end: #newsfeed; offset: 80'>
          <SuggestFollow />

          <OnlineFriend />

          <ProMember />

          <TrendForYou />
        </div>
      )}
    </div>
  );
}
