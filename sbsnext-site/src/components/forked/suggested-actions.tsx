'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'How can SBSNext help my business?',
      label: 'Learn how our expertise drives success',
      action: 'How can SBSNext help my business?',
    },
    {
      title: 'Why should I choose SBSNext?',
      label: 'Understand what makes us different',
      action: 'Why should I choose SBSNext?',
    },
    {
      title: 'What industries does SBSNext serve?',
      label: "See if we’re the right fit for your needs",
      action: "What industries does SBSNext serve?",
    },
    {
      title: 'How do I start working with SBSNext?',
      label: 'Discover our process & next steps',
      action: 'How do I start working with SBSNext?',
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex flex-col w-full h-auto items-start space-y-1"
            >
            <span className="font-bold block text-wrap">{suggestedAction.title}</span>
            <span className="text-muted-foreground block text-wrap">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
