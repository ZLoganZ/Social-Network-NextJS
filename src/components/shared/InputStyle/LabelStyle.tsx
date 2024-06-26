import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ILabelStyleStyleProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const LabelStyle = forwardRef<HTMLLabelElement, ILabelStyleStyleProps>(
  ({
  children,
  className,
  ...props
}, ref) => {
    return (
      <label
        ref={ref}
        {...props}
        className={cn(
          "after:content[''] peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[13px] font-normal leading-tight text-text-2 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-x-red-700 peer-disabled:text-transparent",
          className
        )}
    >
      {/* <div className='flex'>
          {children}
        <span></span>
      </div> */}
      </label>
    );
  }
);

LabelStyle.displayName = 'LabelStyle';

export default LabelStyle;

// bấm ra
// focus
