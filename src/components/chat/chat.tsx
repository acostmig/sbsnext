"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp, Bot, Loader2, User } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { API_URL, cn } from "@/lib/utils";

const suggestions = [
  "What does SBSNext do?",
  "Who have you delivered for?",
  "Can you help with test automation?",
  "I'd like to get in touch.",
];

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      api: `${API_URL}/api/chat`,
    });

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-3xl mx-auto w-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Ask us anything.</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                I only answer about SBSNext — our services, how we work, and
                who we've worked with. No fluff.
              </p>
            </div>
            <div className="grid gap-2 w-full max-w-md">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => append({ role: "user", content: s })}
                  className="text-left rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-foreground/30 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((m) => (
              <Message key={m.id} role={m.role} content={m.content} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 items-center text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking…
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border bg-background px-4 md:px-6 py-4"
      >
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
                }
              }
            }}
            placeholder="Ask about our services, experience, or request a quote…"
            rows={1}
            className="flex-1 resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="md"
            className="h-12 w-12 p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function Message({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex-shrink-0 h-8 w-8 rounded-full border border-border flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[80%] text-sm leading-relaxed",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-2 [&_ol]:my-2 [&_a]:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
