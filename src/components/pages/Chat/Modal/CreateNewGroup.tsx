import { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox } from 'flowbite-react';
import { IoSearchOutline } from 'react-icons/io5';
import { FaXmark } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { CircularProgress } from '@mui/material';

import { messageService } from '@/services/MessageService';
import AvatarMessage from '../Avatar/AvatarMessage';
import { IUserInfo } from '@/types';
import { useReceiveConversation } from '@/hooks/mutation';
import { useSocketStore } from '@/store/socket';
import { Socket } from '@/lib/utils/constants/SettingSystem';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/special';
import { cn } from '@/lib/utils';

export interface ICreateNewGroupProps {
  users: IUserInfo[];
  handleClose: () => void;
}

export default function CreateNewGroup({ users, handleClose }: ICreateNewGroupProps) {
  const t = useTranslations();
  const { chatSocket } = useSocketStore();

  const [checkList, setCheckList] = useState<Record<string, boolean>>({});
  const [checkedUsers, setCheckedUsers] = useState<IUserInfo[]>([]);
  const [contacts, setContacts] = useState<IUserInfo[]>(users);
  const [search, setSearch] = useState<string>('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const searchDebounce = useDebounce(search, 500);

  const HandleOnClick = (userID: string) => {
    setCheckList({ ...checkList, [userID]: !checkList[userID] });
    if (checkList[userID]) {
      setCheckedUsers(checkedUsers.filter((user) => user._id !== userID));
    } else {
      setCheckedUsers([...checkedUsers, users.find((user) => user._id === userID)!]);
    }
  };

  const handleUncheck = (userID: string) => {
    setCheckList({ ...checkList, [userID]: false });
    setCheckedUsers(checkedUsers.filter((user) => user._id !== userID));
  };

  const handleFirstName = (name: string) => {
    const arr = name.split(' ');
    return arr[arr.length - 1];
  };

  const [isLoading, setIsLoading] = useState(false);
  const [membersGroup, SetMembersGroup] = useState<IUserInfo[]>([]);

  useEffect(() => {
    SetMembersGroup(checkedUsers);
  }, [checkedUsers]);

  useEffect(() => {
    if (!searchDebounce) {
      setIsLoadingSearch(false);
      setContacts(users);
      return;
    }

    setIsLoadingSearch(false);
    setContacts(
      users.filter((user) => {
        const name = user.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
        const search = searchDebounce
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
        return name.includes(search);
      })
    );
  }, [searchDebounce]);

  const isChanged = useMemo(() => {
    return membersGroup.length === 0;
  }, [membersGroup]);

  const { mutateReceiveConversation } = useReceiveConversation();
  const router = useRouter();

  // const [membersGroup, SetMembersGroup] = useState<string[]>([]);
  const [name, setGroupName] = useState<string>('');

  const onSubmit = useCallback(() => {
    if (!name || !membersGroup || membersGroup.length < 2) {
      return;
    }

    // convert membersGroup to array of string
    const members = membersGroup.map((member) => member._id);

    setIsLoading(true);

    messageService
      .createConversation({ members: members, name, type: 'group' })
      .then((res) => {
        setIsLoading(false);

        chatSocket.emit(Socket.NEW_CONVERSATION, res.data.metadata);

        mutateReceiveConversation(res.data.metadata);

        handleClose();

        router.push(`/messages/${res.data.metadata._id}`);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [name, membersGroup]);

  return (
    <div className='rounded-lg'>
      <div className='flex flex-col'>
        <input
          type='text'
          placeholder={t("Group's name")}
          className='w-full !py-2 rounded-lg bg-foreground-1'
          onChange={(event) => setGroupName(event.currentTarget.value)}
        />
        <div className='flex flex-row h-28 w-full'>
          {checkedUsers.length == 0 ? (
            <div className='w-full h-full flex items-center justify-center'>
              <div className='font-bold text-sm'>{t('You have not selected any members yet')}</div>
            </div>
          ) : (
            <div className='list-users-checked w-full flex overflow-x-auto px-3'>
              {checkedUsers.map((user) => (
                <div key={user._id} className='flex items-center justify-between gap-8 mt-4'>
                  <div className='flex flex-col items-center'>
                    <div className='avatar relative'>
                      <AvatarMessage key={user._id} user={user} size={52} />
                      <FaXmark
                        className='absolute block rounded-full -top-0.5 -left-1 w-4 h-4 cursor-pointer'
                        onClick={() => handleUncheck(user._id)}
                      />
                    </div>
                    <div className='name_career'>
                      <div className='name mb-1'> {handleFirstName(user.name)}</div>
                    </div>
                  </div>
                  <div className='flex items-center'></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='font-bold text-lg'>{t('List Contacts')}</div>
          <div className='relative mt-4'>
            <div className='absolute left-3 bottom-1/2 translate-y-1/2 flex'>
              <IoSearchOutline className='text-xl' />
            </div>
            <input
              type='text'
              placeholder={t('Search')}
              className='w-full !pl-10 !py-2 rounded-lg bg-foreground-1'
              onChange={(e) => {
                setSearch(e.target.value);
                if (!isLoadingSearch) setIsLoadingSearch(true);
              }}
            />
          </div>
          <div className='list-users flex flex-col w-full max-h-80 overflow-auto custom-scrollbar-fg'>
            {isLoadingSearch ? (
              <div className='flex-center p-1 mt-2'>
                <CircularProgress size={20} className='!text-text-1' />
              </div>
            ) : users.length == 0 ? (
              <div className='w-full h-full flex items-center justify-center'>
                <div className='font-bold text-sm py-2'>{t("You don't have any friends")} :(</div>
              </div>
            ) : contacts.length == 0 ? (
              <div className='w-full h-full flex items-center justify-center'>
                <div className='font-bold text-sm py-2'>{t('Not found any friends')}</div>
              </div>
            ) : (
              contacts.map((user) => (
                <div
                  className='user flex items-center justify-between cursor-pointer mt-5'
                  key={user._id}
                  onClick={() => HandleOnClick(user._id)}>
                  <div className='info flex items-center'>
                    <div className='avatar relative'>
                      <AvatarMessage key={user._id} user={user} />
                    </div>
                    <div className='name text-center ml-2 font-bold'>{user.name}</div>
                  </div>
                  <Checkbox className='items-end mr-1' checked={checkList[user._id]} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-end mt-2 gap-5'>
        <Button
          className={cn('button lg:px-6 text-white max-md:flex-1', isLoading && 'select-none')}
          variant='destructive'
          onClick={handleClose}
          disabled={isLoading}>
          <div className='font-bold'>{t('Cancel')}</div>
        </Button>
        <Button
          className={cn(
            'button lg:px-6 text-white max-md:flex-1',
            (!isChanged || isLoading) && 'select-none'
          )}
          onClick={onSubmit}
          disabled={isChanged || isLoading}>
          {isLoading && <CircularProgress size={20} className='!text-text-1 mr-2' />}
          <div className='font-bold'>{t('Create')}</div>
        </Button>
      </div>
    </div>
  );
}
