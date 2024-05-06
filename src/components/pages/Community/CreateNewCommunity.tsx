import { InputStyle } from '@/components/shared/InputStyle';
import TextareaV2 from '@/components/ui/textarea-v2';
import { useTranslations } from 'next-intl';
import { IoAdd, IoHappyOutline } from 'react-icons/io5';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import { useThemeMode } from 'flowbite-react';
import { IEmoji } from '@/types';
import Popover from '@/components/ui/popover-v2';
import { PiHashLight } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';
import { useCurrentUserInfo } from '@/hooks/query';

export interface ICreateNewCommunityProps {}

export default function CreateNewCommunity(props: ICreateNewCommunityProps) {
  const t = useTranslations();
  const { mode } = useThemeMode();

  const { currentUserInfo } = useCurrentUserInfo();

  const [description, setDescription] = useState('');
  const [cursorDes, setCursorDes] = useState(0);

  const [about, setAbout] = useState('');
  const [cursorAbout, setCursorAbout] = useState(0);

  const [hashTagList, setHashTagList] = useState<string[]>([]);
  const [rules, setRules] = useState<[]>([]);

  const [ruleInputs, setRuleInputs] = useState<JSX.Element[]>([]);

  const ruleInputHTML: any = (index: number) => {
    return (
      <div>
        <div className='flex'>
          <span
            className='p-0.5 rounded-full bg-foreground-1'
            onClick={() => {
              const newRuleInputs = ruleInputs.filter((_, i) => i !== index);
              setRuleInputs(newRuleInputs);
            }}>
            <FiMinus className='size-5 text-1' />
          </span>
        </div>
        <div className='relative mb-5 mt-4'>
          <InputStyle label={`Title ${index + 1}: `} />
        </div>
        <div className='relative'>
          <InputStyle label={`Description ${index + 1}: `} />
        </div>
      </div>
    );
  };

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
  ];

  return (
    <div className='relative mx-auto bg-background-1 shadow-xl rounded-lg w-[650px] animate-fade-up'>
      <div className='text-center py-4 border-b mb-0 border-border-1'>
        <h2 className='text-sm font-medium text-text-1'>{t('Create Community')}</h2>
      </div>

      <div className='max-h-[490px] overflow-y-scroll custom-scrollbar-bg px-5 py-4 *:mt-7'>
        <div className='relative !mt-3'>
          <InputStyle label='Community Name' />
        </div>
        <div className='flex-between'>
          <TextareaV2
            label='Description'
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorDes(cursorPosition || 0);
            }}
            onClick={(e) => {
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorDes(cursorPosition || 0);
            }}
            onKeyUp={(e) => {
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorDes(cursorPosition || 0);
            }}
          />
          <div className='ms-2'>
            <Popover
              open={false}
              mainContent={<IoHappyOutline className='text-2xl' />}
              hoverContent={
                <Picker
                  data={async () => {
                    const response = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data');

                    return response.json();
                  }}
                  onEmojiSelect={(emoji: IEmoji) => {
                    setCursorDes(cursorDes + emoji.native.length);
                    setDescription(
                      description.slice(0, cursorDes) + emoji.native + description.slice(cursorDes)
                    );
                  }}
                  theme={mode}
                />
              }
            />
          </div>
        </div>
        <div className='flex-between'>
          <TextareaV2
            label='About'
            value={about}
            onChange={(e) => {
              setAbout(e.currentTarget.value);
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorAbout(cursorPosition || 0);
            }}
            onClick={(e) => {
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorAbout(cursorPosition || 0);
            }}
            onKeyUp={(e) => {
              // get cursor position
              const cursorPosition = e.currentTarget.selectionStart;
              setCursorAbout(cursorPosition || 0);
            }}
          />
          <div className='ms-2'>
            <Popover
              open={false}
              mainContent={<IoHappyOutline className='text-2xl' />}
              hoverContent={
                <Picker
                  data={async () => {
                    const response = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data');

                    return response.json();
                  }}
                  onEmojiSelect={(emoji: IEmoji) => {
                    setCursorAbout(cursorAbout + emoji.native.length);
                    setAbout(about.slice(0, cursorAbout) + emoji.native + about.slice(cursorAbout));
                  }}
                  theme={mode}
                />
              }
            />
          </div>
        </div>
        <div className='relative'>
          <InputStyle
            label='Hashtag'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setHashTagList([...hashTagList, e.currentTarget.value]);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
        <div className='render-hashtag flex-start flex-wrap gap-3'>
          {hashTagList.map((tag, index) => (
            <span key={index} className='hashtag px-3 py-1.5 bg-1 flex-start rounded-full'>
              <PiHashLight className='size-4 me-1' />
              <span>{tag}</span>
              <IoMdClose
                className='size-4 ms-1 hover:text-red-500 duration-300'
                onClick={() => {
                  const newHashTagList = hashTagList.filter((_, i) => i !== index);
                  setHashTagList(newHashTagList);
                }}
              />
            </span>
          ))}
        </div>
        <div className='flex-start gap-2'>
          <span className='text-sm'>Rules</span>
          <span className='p-0.5 rounded-full bg-foreground-1'>
            <IoAdd
              className='size-5 text-1'
              onClick={() => {
                setRuleInputs([...ruleInputs, ruleInputHTML(ruleInputs.length)]);
              }}
            />
          </span>
        </div>
        <div className='render-rule-input mx-3 *:mb-8'>
          {ruleInputs.map((_, index) => ruleInputHTML(index))}
        </div>
        <div className='member'></div>
      </div>

      <div className='p-5 flex justify-between items-center'></div>
    </div>
  );
}
