"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ContactDialog } from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/chat/", label: "Chat" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="wordmark text-lg">
          SBS<em>Next</em>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ContactDialog trigger={<Button size="sm">Contact</Button>} />
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-tight py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm py-2"
                onClick={() => setMobileOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <ContactDialog
              trigger={<Button size="md" className="mt-2 w-full">Contact</Button>}
            />
          </div>
        </div>
      )}
    </header>
  );
}
