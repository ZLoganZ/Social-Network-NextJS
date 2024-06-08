import { useGetHotQuestions } from '@/hooks/query';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';

export interface IHotQuestionsProps {}

export default function HotQuestions({}: IHotQuestionsProps) {
  const t = useTranslations();

  const { hotQuestions, isLoadingHotQuestions } = useGetHotQuestions();

  return (
    <div>
      <div className='h4-regular'>{t('Hot Questions')}</div>
      <div className='*:flex-start mt-4 *:mb-2 *:cursor-pointer *:gap-3 *:text-[0.8rem]'>
        {isLoadingHotQuestions
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton variant='text' width={50} height={40} />
                <Skeleton variant='text' width={250} height={40} />
              </div>
            ))
          : hotQuestions.map((question, index) => (
              <div key={index}>
                <span className='min-w-10 rounded-md bg-green-400 px-2 py-1 text-center text-black'>
                  {question.vote_score}
                </span>
                <div className='line-clamp-2 text-blue-400 duration-300 hover:text-blue-500'>
                  {question.title}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}