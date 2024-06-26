'use client';

import { useRouter } from '@/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import { useCurrentUserInfo } from '@/hooks/query';
import { useLeaveGroup, useSendMessage } from '@/hooks/mutation';
import { useSocketStore } from '@/store/socket';
import { Socket } from '@/lib/utils/constants/SettingSystem';
import { IConversation, IMessage } from '@/types';

export interface IContextMenuConversationBoxProps {
  children: React.ReactNode;
  conversation: IConversation;
}

export default function ContextMenuConversationBox({
  children,
  conversation
}: IContextMenuConversationBoxProps) {
  const t = useTranslations();

  const router = useRouter();
  const { currentUserInfo } = useCurrentUserInfo();
  const { chatSocket } = useSocketStore();

  const { mutateLeaveGroup } = useLeaveGroup();
  const { mutateSendMessage } = useSendMessage();

  const isGroup = conversation.type === 'group';
  const isSeen =
    conversation.lastMessage.sender._id === currentUserInfo._id ||
    conversation.lastMessage.seen.some(
      seen => seen._id === currentUserInfo._id
    );

  const otherUser = useMemo(() => {
    if (isGroup) return;

    return conversation.members.find(
      member => member._id !== currentUserInfo._id
    );
  }, [currentUserInfo, conversation?.members]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='!w-fit'>
        <ContextMenuItem
          onClick={() => {
            const emitType = isSeen ? Socket.UNSEEN_MSG : Socket.SEEN_MSG;
            chatSocket.emit(emitType, {
              conversationID: conversation._id,
              userID: currentUserInfo._id
            });
          }}
        >
          {isSeen ? t('Undo reading') : t('Mark as read')}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          {t('Mute notifications')}
        </ContextMenuItem>
        {!isGroup && (
          <ContextMenuItem
            onClick={() => router.push(`/profile/${otherUser?._id}`)}
          >
            {t('View profile')}
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => {}}>{t('Audio call')}</ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>{t('Video chat')}</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            mutateLeaveGroup(conversation._id);
            const message = {
              _id: uuidv4().replace(/-/g, ''),
              conversation_id: conversation._id,
              sender: {
                _id: currentUserInfo._id,
                user_image: currentUserInfo.user_image,
                name: currentUserInfo.name
              },
              isSending: true,
              seen: [],
              type: 'notification',
              action: 'leave_conversation',
              createdAt: new Date().toISOString()
            };

            mutateSendMessage(message as unknown as IMessage);
            chatSocket.emit(Socket.PRIVATE_MSG, {
              conversationID: conversation._id,
              message
            });
          }}
        >
          {isGroup ? t('Leave group') : t('Delete chat')}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
