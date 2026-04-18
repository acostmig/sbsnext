"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ContactDialog } from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="hero-gradient">
      <div className="container-tight pt-24 pb-20 md:pt-32 md:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AI · Test Automation · Full-Stack · Agent Enablement
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            You don't need another agency.
            <br />
            <span className="text-muted-foreground">You need engineers who finish.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            SBSNext builds AI features, Playwright test systems, and Next.js
            products for teams tired of half-delivered pilots. Senior
            engineering, direct access, no account-manager layer.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ContactDialog
              trigger={
                <Button size="lg">
                  Let's talk <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
            <Button asChild variant="outline" size="lg">
              <Link href="/chat/">
                <MessageSquare className="h-4 w-4" /> Chat with our bot
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
