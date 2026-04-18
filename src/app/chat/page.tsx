import { Chat } from "@/components/chat/chat";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Chat with the SBSNext AI Assistant",
  description:
    "Ask our AI assistant anything about SBSNext — services, engagements, stack, track record. Built on the same pattern we ship for clients.",
  path: "/chat/",
  noIndex: true,
});

export default function ChatPage() {
  return <Chat />;
}
