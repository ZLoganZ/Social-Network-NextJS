import Link from 'next/link';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { cn } from '@/lib/utils';

interface ITabsProps {
  rootClassName?: string;
  navClassName?: string;
  ulClassName?: string;
  chevronClassName?: string;
  children?: React.ReactNode;
  disableChevron?: boolean;
}

function Tabs(props: ITabsProps) {
  return (
    <div
      className={cn('relative -mb-px px-2', props.rootClassName)}
      data-uk-slider='finite: true'
      tabIndex={-1}>
      <nav className={cn('overflow-hidden rounded-xl uk-slider-container pt-2', props.navClassName)}>
        <ul
          className={cn(
            'uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white',
            props.ulClassName
          )}
          data-uk-switcher='connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium'>
          {props.children}
        </ul>
      </nav>

      {!props.disableChevron && (
        <>
          <Link
            href='#'
            className={cn(
              'absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2.5 justify-start rounded-xl bg-gradient-to-r from-white via-white dark:from-dark-1 dark:via-dark-1',
              props.chevronClassName
            )}
            data-uk-slider-item='previous'>
            <IoChevronBack className='text-2xl ml-1' />
          </Link>
          <Link
            href='#'
            className={cn(
              'absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2.5 justify-end rounded-xl bg-gradient-to-l from-white via-white dark:from-dark-1 dark:via-dark-1',
              props.chevronClassName
            )}
            data-uk-slider-item='next'>
            <IoChevronForward className='text-2xl mr-1' />
          </Link>
        </>
      )}
    </div>
  );
}

interface ITabContentProps {
  className?: string;
  children?: React.ReactNode;
}

function TabsContent(props: ITabContentProps) {
  return (
    <div
      id='setting_tab'
      className={cn(
        'uk-switcher overflow-hidden rounded-xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-dark-1 md:px-20 md:py-12',
        props.className
      )}>
      {props.children}
    </div>
  );
}

interface ITabTitleProps {
  className?: string;
  children?: React.ReactNode;
}

function TabTitle(props: ITabTitleProps) {
  return (
    <li className='w-auto pr-2.5'>
      <Link
        href='#'
        className={cn(
          'inline-block hover:text-blue-400 select-none border-b-2 border-transparent p-4 pt-2 text-white transition-colors duration-300 ease-in-out aria-selected:border-blue-500 aria-selected:text-blue-500',
          props.className
        )}>
        {props.children}
      </Link>
    </li>
  );
}

export { Tabs, TabsContent, TabTitle };