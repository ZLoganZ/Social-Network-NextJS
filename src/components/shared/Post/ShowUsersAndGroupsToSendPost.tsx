'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { isThisWeek, isThisYear, isToday } from 'date-fns';
import { IoSearchOutline } from 'react-icons/io5';
import { MdPublic } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

import Image from 'next/image';

import { useConversationsData, useCurrentUserInfo, usePostData } from '@/hooks/query';
import { Avatar, CircularProgress } from '@mui/material';
import AvatarMessage from '@/components/pages/Chat/Avatar/AvatarMessage';
import { IConversation, IMessage, IUserInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { cn, getImageURL } from '@/lib/utils';
import { Link } from '@/navigation';
import ShowContent from '../ShowContent/ShowContent';
import AvatarGroup from '@/components/pages/Chat/Avatar/AvatarGroup';
import { Socket } from '@/lib/utils/constants/SettingSystem';
import { useReceiveConversation, useSendMessage } from '@/hooks/mutation';
import { useSocketStore } from '@/store/socket';
import { messageService } from '@/services/MessageService';
import { useDebounce } from '@/hooks/special';

export interface IShowUsersAndGroupsToSendPostProps {
  post_id: string;
  content: string;
}

type Results = {
  recentConversations: IConversation[];
  groups: IConversation[];
  members: IUserInfo[];
};

export default function ShowUsersAndGroupsToSendPost({
  post_id,
  content
}: IShowUsersAndGroupsToSendPostProps) {
  const t = useTranslations();

  const { post, isLoadingPost } = usePostData(post_id);

  const { currentUserInfo } = useCurrentUserInfo();
  const members = useMemo(() => {
    return currentUserInfo.members ?? [];
  }, [currentUserInfo.members]);
  const { conversations } = useConversationsData();

  const recentConversations = useMemo(
    () => (conversations && conversations.length > 0 ? conversations.slice(0, 5) : []),
    []
  );

  const groups = useMemo(() => {
    return conversations.filter((conversation) => conversation.type === 'group');
  }, []);

  const [results, setResults] = useState<Results>({
    recentConversations: recentConversations,
    groups: groups,
    members: members
  });

  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 500);

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    if (!searchDebounce) {
      setIsLoadingSearch(false);
      setResults({
        recentConversations: recentConversations,
        groups: groups,
        members: members
      });
      return;
    }

    setIsLoadingSearch(true);

    setResults({
      recentConversations: conversations.filter((conversation) => {
        const otherUser = conversation.members.find((member) => member._id !== currentUserInfo._id);

        return (conversation.name || otherUser!.name)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(searchDebounce.toLowerCase());
      }),
      groups: groups.filter((group) =>
        group.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(searchDebounce.toLowerCase())
      ),
      members: members.filter((member) =>
        member.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(searchDebounce.toLowerCase())
      )
    });

    setIsLoadingSearch(false);
  }, [searchDebounce]);

  const format = useFormatter();
  const handleDateTime = useCallback((date: string) => {
    const messageDate = new Date(date).getTime();

    // check if today
    if (isToday(messageDate)) {
      return format.relativeTime(new Date(date), new Date());
    }

    // check if this week
    if (isThisWeek(messageDate, { weekStartsOn: 1 })) {
      return (
        format.dateTime(new Date(date), { weekday: 'long' }) +
        ' • ' +
        format.dateTime(new Date(date), {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      );
    }

    // check if this year
    if (isThisYear(messageDate)) {
      return (
        format.dateTime(new Date(date), {
          month: 'long',
          day: 'numeric'
        }) +
        ' • ' +
        format.dateTime(new Date(date), {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      );
    }

    return (
      format.dateTime(new Date(date), {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) +
      ' • ' +
      format.dateTime(new Date(date), {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    );
  }, []);

  const [id, setId] = useState(uuidv4().replace(/-/g, ''));
  const [isLoading, setIsLoading] = useState(false);
  const { mutateSendMessage } = useSendMessage();
  const { mutateReceiveConversation } = useReceiveConversation();

  const [sent, setSent] = useState([] as string[]);
  const [messageContent, setMessage] = useState('');

  const { chatSocket } = useSocketStore();

  const handleSubmitContact = (content: string, user: string) => {
    if (!user) return;

    setMessage('');
    setIsLoading(true);

    messageService
      .createConversation({
        type: 'private',
        members: [user]
      })
      .then((res) => {
        chatSocket.emit(Socket.NEW_CONVERSATION, res.data.metadata);
        mutateReceiveConversation(res.data.metadata);

        const ID = res.data.metadata._id;

        setSent([...sent, user]);

        const message = {
          _id: id,
          conversation_id: ID,
          sender: {
            _id: currentUserInfo._id,
            user_image: currentUserInfo.user_image,
            name: currentUserInfo.name
          },
          type: 'post',
          isSending: true,
          content: content || '',
          post_id: post_id,
          seen: [],
          createdAt: new Date()
        };

        setId(uuidv4().replace(/-/g, ''));
        mutateSendMessage(message as unknown as IMessage);
        chatSocket.emit(Socket.PRIVATE_MSG, { conversationID: ID, message });
      });
  };

  const handleSubmit = async (content: string, ID: string) => {
    if (!ID) return;

    setMessage('');
    setSent([...sent, ID]);

    const message = {
      _id: id,
      conversation_id: ID,
      sender: {
        _id: currentUserInfo._id,
        user_image: currentUserInfo.user_image,
        name: currentUserInfo.name
      },
      type: 'post',
      isSending: true,
      content: content || '',
      post_id: post_id,
      seen: [],
      createdAt: new Date()
    };

    setIsLoading(false);
    setId(uuidv4().replace(/-/g, ''));
    mutateSendMessage(message as unknown as IMessage);
    chatSocket.emit(Socket.PRIVATE_MSG, { conversationID: ID, message });
  };

  const sending = (conversationOrUserID: string) => {
    const conversation = conversations.find((conversation) => conversation._id === conversationOrUserID);
    if (!conversation) {
      const foundConversations = conversations.filter((conversation) => conversation.type === 'private');
      const foundConversation = foundConversations.find((conversation) =>
        conversation.members.find((member) => member._id === conversationOrUserID)
      );
      return foundConversation?.lastMessage.isSending;
    }
    return conversation?.lastMessage.isSending;
  };

  return (
    <div className='w-[740px] max-h-[780px] overflow-y-scroll bg-foreground-1 custom-scrollbar-fg p-7 animate-fade-up rounded-lg'>
      <div>
        <div className='flex flex-col w-full gap-5'>
          <div className='font-bold text-lg text-center'>{t('Share')}</div>
          {isLoadingPost ? (
            <div className='bg-foreground-2 rounded-lg p-4'>
              <div className='flex-start gap-3'>
                <CircularProgress size={20} className='!text-text-1' />
              </div>
            </div>
          ) : (
            <div className='bg-foreground-2 rounded-lg p-4'>
              <div className='flex-start'>
                <Link href={`/profile/${post!.post_attributes.user._id}`}>
                  <Avatar src={getImageURL(post!.post_attributes.user.user_image)} />
                </Link>
                <div className='flex gap-1 flex-col ms-3'>
                  <Link href={`/profile/${post!.post_attributes.user._id}`} className='base-bold'>
                    {post!.post_attributes.user.name}
                  </Link>
                  <div className='flex-start gap-1 *:small-bold *:text-text-2 hover:*:underline hover:*:text-text-1'>
                    <Link href={`/posts/${post!._id}`}>{handleDateTime(post!.createdAt)}</Link>
                    <span>•</span>

                    {post!.visibility === 'public' ? (
                      <MdPublic className='size-4' />
                    ) : post!.visibility === 'friend' ? (
                      <FaUserFriends className='size-4' />
                    ) : (
                      <IoMdLock className='size-4' />
                    )}
                  </div>
                </div>
              </div>
              <div className=''>
                <div className='flex-between items-start gap-2'>
                  <div
                    className={cn('my-5 px-2', post!.post_attributes.images.length > 0 ? 'w-5/6' : 'w-full')}>
                    <ShowContent content={content.length > 250 ? content.slice(0, 250) + '...' : content} />
                  </div>
                  {post!.post_attributes.images.length > 0 && (
                    <div key={post!.post_attributes.images[0]} className='relative w-1/6'>
                      <Image
                        width={500}
                        height={500}
                        src={getImageURL(post!.post_attributes.images[0])}
                        alt={post!.post_attributes.images[0]}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className='flex'>
            <Avatar src={getImageURL(currentUserInfo.user_image)} />
            <input
              type='text'
              placeholder={t('Please write something for this content') + '...'}
              className='w-full !py-2 rounded-lg bg-foreground-1 border-none active:border-none border focus:ring-0'
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <div className='relative'>
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
              <div className='flex-center p-1'>
                <CircularProgress size={20} className='!text-text-1' />
              </div>
            ) : (
              <>
                {results.recentConversations.length > 0 && (
                  <div className='space-y-4'>
                    <div className='font-bold text-lg text-left'>{t('Recent')}</div>
                    <div className='flex flex-col gap-5'>
                      {results.recentConversations.map((conversation) => {
                        const isGroup = conversation.type === 'group';
                        const otherUser = conversation.members.find(
                          (member) => member._id !== currentUserInfo._id
                        );

                        return (
                          <div
                            className='conversation flex items-center justify-between'
                            key={conversation._id + '_recent'}>
                            <div className='info flex items-center'>
                              <div className='avatar relative'>
                                {!isGroup ? (
                                  <AvatarMessage key={otherUser!._id} user={otherUser!} />
                                ) : (
                                  <AvatarGroup
                                    key={conversation._id}
                                    users={conversation.members}
                                    image={conversation.image}
                                  />
                                )}
                              </div>
                              <div className='name text-center ml-2 font-bold'>
                                {conversation.name || otherUser!.name}
                              </div>
                            </div>
                            {!sent.includes(conversation._id) ? (
                              <Button
                                disabled={isLoading}
                                className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'
                                onClick={() => {
                                  handleSubmit(messageContent, conversation._id);
                                }}>
                                {t('Send')}
                              </Button>
                            ) : sending(conversation._id) ? (
                              <Button
                                disabled
                                className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                                <CircularProgress size={20} className='!text-text-1' />
                              </Button>
                            ) : (
                              <Button
                                disabled
                                className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                                {t('Sent')}
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {results.groups.length > 0 && (
                  <div className='space-y-4'>
                    <div className='font-bold text-lg text-left mt-5'>{t('Communities')}</div>
                    <div className='flex flex-col gap-5'>
                      {results.groups.map((group) => (
                        <div className='group flex items-center justify-between' key={group._id + '_group'}>
                          <div className='info flex items-center'>
                            <div className='avatar relative'>
                              <AvatarGroup key={group._id} users={group.members} image={group.image} />
                            </div>
                            <div className='name text-center ml-2 font-bold'>{group.name}</div>
                          </div>
                          {!sent.includes(group._id) ? (
                            <Button
                              disabled={isLoading}
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'
                              onClick={() => {
                                handleSubmit(messageContent, group._id);
                              }}>
                              {t('Send')}
                            </Button>
                          ) : sending(group._id) ? (
                            <Button
                              disabled
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                              <CircularProgress size={20} className='!text-text-1' />
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                              {t('Sent')}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {results.members.length > 0 && (
                  <div className='space-y-4'>
                    <div className='font-bold text-lg text-left mt-5'>{t('Contacts')}</div>
                    <div className='flex flex-col gap-5'>
                      {results.members.map((user) => (
                        <div className='user flex items-center justify-between' key={user._id + '_user'}>
                          <div className='info flex items-center'>
                            <div className='avatar relative'>
                              <AvatarMessage key={user._id} user={user} />
                            </div>
                            <div className='name text-center ml-2 font-bold'>{user.name}</div>
                          </div>
                          {!sent.includes(user._id) ? (
                            <Button
                              disabled={isLoading}
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'
                              onClick={() => {
                                handleSubmitContact(messageContent, user._id);
                              }}>
                              {t('Send')}
                            </Button>
                          ) : sending(user._id) ? (
                            <Button
                              disabled
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                              <CircularProgress size={20} className='!text-text-1' />
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className='base-bold !bg-foreground-2 hover:bg-hover-2 duration-300 text-text-2 px-4 py-1 rounded-2xl items-end mr-1'>
                              {t('Sent')}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
