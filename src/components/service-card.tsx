"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ServiceCard({
  title,
  description,
  icon,
  href,
  delay = 0,
  className,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  delay?: number;
  className?: string;
}) {
  const body = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "group relative h-full rounded-lg border border-border bg-background p-6 transition-all",
        href && "hover:border-foreground/20 hover:shadow-sm cursor-pointer",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground">
          {icon}
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );

  return href ? <Link href={href}>{body}</Link> : body;
}
