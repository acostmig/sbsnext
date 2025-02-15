import { Chat } from '@/components/forked/chat';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/forked/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
