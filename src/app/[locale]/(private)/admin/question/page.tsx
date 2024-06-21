'use client';

import { QuestionsTable } from '@/components/pages/Admin/Questions/QuestionsTable';
import { UserNav } from '@/components/pages/Admin/user-nav';
import { Button } from '@/components/ui/button';
import { useCurrentUserInfo } from '@/hooks/query';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FiAlertCircle } from 'react-icons/fi';

interface IQuestionManagementProps {}

export default function QuestionManagement({}: IQuestionManagementProps) {
  const t = useTranslations();
  const router = useRouter();

  const { currentUserInfo } = useCurrentUserInfo();

  if (!currentUserInfo.role.some((role) => role === '0101'))
    return (
      <section className='flex-center size-full flex-col gap-4'>
        <div className='flex-center my-2 text-2xl font-bold text-text-1'>
          <FiAlertCircle className='mr-2 size-8 text-red-500' />
          {t('You are not authorized to view this page!')}
        </div>

        <Button type='button' onClick={() => router.push('/')}>
          {t('Back to Homepage')}
        </Button>
      </section>
    );

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Question management</h2>
          <p className='text-muted-foreground'>Manage questions and their contents, categories, and tags.</p>
        </div>
        <div className='flex items-center space-x-2'>
          <UserNav />
        </div>
      </div>
      <QuestionsTable />
    </div>
  );
}
