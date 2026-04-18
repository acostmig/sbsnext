"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input";
import { API_URL } from "@/lib/utils";

export function ContactDialog({
  trigger,
  open,
  onOpenChange,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      organization: String(form.get("organization") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Thanks! We'll reach out shortly.");
      (e.target as HTMLFormElement).reset();
      setOpen(false);
      // Google Ads conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-16881455634/9ycFCM3ZwZ8aEJKk2vE-",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send. Please try again or email info@sbsnext.com.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's talk</DialogTitle>
          <DialogDescription>
            Tell us a bit about what you need — we'll get back within one business day.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="organization" className="text-sm font-medium">Organization</label>
            <Input id="organization" name="organization" autoComplete="organization" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium">Phone (optional)</label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">Message (optional)</label>
            <Textarea id="message" name="message" rows={4} />
          </div>
          <Button type="submit" disabled={submitting} size="lg" className="mt-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
