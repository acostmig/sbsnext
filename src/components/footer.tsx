import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-tight py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="wordmark text-lg">
            SBS<em>Next</em>
          </div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            {SITE.description}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services/" className="hover:text-foreground">Services</Link></li>
            <li><Link href="/about/" className="hover:text-foreground">About</Link></li>
            <li><Link href="/chat/" className="hover:text-foreground">Chat with us</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a href={SITE.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={SITE.github} aria-label="GitHub" target="_blank" rel="noreferrer" className="hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.legal}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
