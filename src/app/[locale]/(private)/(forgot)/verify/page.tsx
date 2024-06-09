'use client';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export interface IVerifyProps {
}

export default function Verify({ }: IVerifyProps) {
  const t = useTranslations();
  const router = useRouter();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email = params.get('email');

  const [code, setCode] = useState('');

  const [inputValues, setInputValues] = useState<string[]>(['', '', '', '', '', '', '', '']);

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);

    if (index < inputValues.length - 1 && e.target.value) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    const str = newInputValues.join('');
    setCode(str);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    const pastedArray = pastedData.split('').slice(0, inputValues.length);

    setInputValues(pastedArray);
    setCode(pastedData);

    const nextInput = document.getElementById(`input-${inputValues.length - 1}`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  useEffect(() => {
    if (!email) {
      router.push('/forgot-password');
    }

    if (email) {
      // dispatch(CHECK_VERIFY_CODE_SAGA({ email: email }));
    }
  }, [email]);

  const handleSubmit = () => {
    if (code === params.get('code')) {
      window.alert('Lêu lêu, bị lừa rồi đó, đừng nhập code này nữa nha, đọc note kìa!');
    }
    // dispatch(VERIFY_CODE_SAGA({ email: email!, code: code }));
  };

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdown]);

  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleResendOTP = () => {
    if (!isResendDisabled) {
      setInputValues(['', '', '', '', '', '', '', '']);
      // dispatch(FORGOT_PASSWORD_SAGA({ email: email! }));

      // Disable the resend button
      setIsResendDisabled(true);

      // Enable the resend button after 60 seconds
      setTimeout(() => {
        setIsResendDisabled(false);
      }, 60000); // 60000 milliseconds = 60 seconds

      setCountdown(60);
    }
  };

  return (
    <div className='pt-20'>
      <div className='max-w-lg mx-auto border rounded'>
        <div className='shadow-md px-4 py-6'>
          <div className='flex justify-center gap-2 mb-6'>
            {inputValues.map((value, index) => (
              <input
                key={index}
                id={`input-${index}`}
                className='w-12 h-12 text-center font-bold text-lg border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500'
                type='text'
                maxLength={1}
                autoComplete='one-time-code'
                value={value}
                onChange={handleInputChange(index)}
                onPaste={handlePaste}
                required
              />
            ))}
          </div>
          <div className='flex items-center justify-center'>
            <button
              className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={handleSubmit}>
              Verify
            </button>
            <button
              className='inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4'
              onClick={handleResendOTP}
              disabled={isResendDisabled}>
              Resend OTP {isResendDisabled ? '(' + countdown + 's)' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
