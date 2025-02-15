'use client';

import type { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/forked/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, generateUUID } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';
import { toast } from 'sonner';
import React from 'react';

type ChatContextType = {
  Id: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  setChatData: (data: Partial<ChatContextType>) => void;

}

const ChatContext = React.createContext<ChatContextType | null>(null);

export function useChatContext() {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export function ChatContextProvider(
  { children, selectedChatModelId }: 
  { children: React.ReactNode, selectedChatModelId:string }
) {

  
  const [chatData, setChatData] = useState<ChatContextType>({
    Id: "",
    selectedModelId: selectedChatModelId,
    selectedVisibilityType: "private", // Default visibility type
    isReadonly: false,
    setChatData: () => {},
  });

  const updateChatData = (data: Partial<ChatContextType>) => {
    setChatData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ChatContext.Provider value={{ ...chatData, setChatData: updateChatData }}>
      {children}
    </ChatContext.Provider>
  );
}

export function Chat({
  id,
  initialMessages,
  selectedChatModelId,
  selectedVisibilityType,
  isReadonly,

}: {
  id: string;
  initialMessages: Array<Message>;
  selectedChatModelId?: string;
  selectedVisibilityType?: VisibilityType;
  isReadonly?: boolean;
}) {
  const { mutate } = useSWRConfig();
  const {
    selectedModelId,
    selectedVisibilityType: contextVisibilityType,
    isReadonly: contextReadonly,
    setChatData,
  } = useChatContext();

  //update chat data if provided
  React.useEffect(() => {
    setChatData({
      Id: id,
      selectedModelId: selectedChatModelId ?? selectedModelId,
      selectedVisibilityType: selectedVisibilityType ?? contextVisibilityType,
      isReadonly: isReadonly ?? contextReadonly,
    });
  }, [id, selectedChatModelId, selectedVisibilityType, isReadonly]);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, selectedChatModel: selectedModelId },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: (msg) => {
      mutate('/api/history');
    },
    onError: (error) => {
      toast.error('An error occured, please try again!');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex flex-col min-w-0 pt-15 h-dvh bg-background" id="chat-main">
        {/* <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        /> */}

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly??false}
          isBlockVisible={isBlockVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly??false}
      />
    </>
  );
}
