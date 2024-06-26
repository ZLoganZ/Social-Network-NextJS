import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import { Link } from '@/navigation';

interface ITabsProps {
  id: string;
  active?: number;
  rootClassName?: string;
  navClassName?: string;
  ulClassName?: string;
  backChevronClassName?: string;
  forwardChevronClassName?: string;
  children?: React.ReactNode;
  disableChevron?: boolean;
}

function Tabs(props: ITabsProps) {
  const makeColor = false;
  return (
    <div className={cn('relative -mb-px px-2', props.rootClassName)} data-uk-slider='finite: true'>
      <nav className={cn('overflow-hidden uk-slider-container pt-2', props.navClassName)}>
        <ul
          className={cn(
            'uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-text-1',
            props.ulClassName
          )}
          data-uk-switcher={`connect: #${
            props.id
          }; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium; active: ${
            props.active || 0
          }`}>
          {props.children}
        </ul>
      </nav>

      {!props.disableChevron && (
        <>
          <Link
            href=''
            className={cn(
              'absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2.5 justify-start rounded-xl',
              makeColor && 'bg-gradient-to-r from-white via-white dark:from-dark-1 dark:via-dark-1',
              props.backChevronClassName
            )}
            data-uk-slider-item='previous'>
            <IoChevronBack className='text-2xl ml-1' />
          </Link>
          <Link
            href=''
            className={cn(
              'absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2.5 justify-end rounded-xl',
              makeColor && 'bg-gradient-to-l from-white via-white dark:from-dark-1 dark:via-dark-1',
              props.forwardChevronClassName
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
  id: string;
  className?: string;
  children?: React.ReactNode;
}

function TabsContent(props: ITabContentProps) {
  return (
    <div
      id={props.id}
      className={cn('uk-switcher rounded-xl border shadow-sm dark:border-slate-700', props.className)}>
      {props.children}
    </div>
  );
}

interface ITabTitleProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function TabTitle(props: ITabTitleProps) {
  return (
    <li className='w-auto pr-2.5' onClick={props.onClick}>
      <Link
        href=''
        className={cn(
          'inline-block hover:text-blue-400 select-none border-b-2 border-transparent p-4 transition-colors duration-300 ease-in-out aria-expanded:border-blue-500 aria-expanded:text-blue-500',
          props.className
        )}>
        {props.children}
      </Link>
    </li>
  );
}

export { Tabs, TabsContent, TabTitle };
