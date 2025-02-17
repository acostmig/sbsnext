'use client';
import { usePathname } from "next/navigation"; // Import usePathname

export default function Footer() {
  const IsChatPage = usePathname().includes("chat");
  return (
    <footer hidden={IsChatPage===true} className="w-full bg-gray-900 text-gray-400 py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} SBSNext LLC. All rights reserved.</p>
        <a
            href="tel:+15512944913"
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
          >
            📞 (551) 294-4913
          </a>

          <a
            href="mailto:info@sbsnext.com"
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
          >
            ✉️ info@sbsnext.com
          </a>
        <a
          href="https://www.linkedin.com/company/sbsnext"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mx-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>         
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
