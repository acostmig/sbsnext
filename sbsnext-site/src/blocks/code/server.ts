import { z } from 'zod';
import { streamObject } from 'ai';
import { myProvider } from '@/lib/ai/models';
import { codePrompt, updateDocumentPrompt } from '@/lib/ai/prompts';
import { createDocumentHandler } from '@/lib/blocks/server';

export const codeDocumentHandler = createDocumentHandler<'code'>({
  kind: 'code',
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = '';
    let codeLanguage: 'python' | 'csharp' | undefined=undefined;
    const { fullStream } = streamObject({
      model: myProvider.languageModel('block-model'),
      system: codePrompt,
      prompt: title,
      schema: z.object({
        code: z.string(),
        language: z.enum(['python', 'csharp']).describe('The programming language of the code'),
      }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { code, language } = object;
        if (code) {
          dataStream.writeData({
            type: 'code-delta',
            content: code ?? '',
          });
          codeLanguage = language;
          draftContent = code;
        }
      }
    }

    return {draftContent: draftContent, language: codeLanguage};
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = '';

    const { fullStream } = streamObject({
      model: myProvider.languageModel('block-model'),
      system: updateDocumentPrompt(document.content??"", 'code'),
      prompt: description,
      schema: z.object({
        code: z.string(),
      }),
    });

    for await (const delta of fullStream) {
      const { type } = delta;

      if (type === 'object') {
        const { object } = delta;
        const { code } = object;

        if (code) {
          dataStream.writeData({
            type: 'code-delta',
            content: code ?? '',
          });

          draftContent = code;
        }
      }
    }

    return draftContent;
  },
});
