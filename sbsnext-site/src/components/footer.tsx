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

        <a
            href="https://github.com/acostmig/sbsnext"
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
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.305 3.49.997.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.935 0-1.31.465-2.385 1.235-3.23-.135-.303-.54-1.525.105-3.175 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.295-1.552 3.3-1.23 3.3-1.23.645 1.65.24 2.872.105 3.175.77.845 1.235 1.92 1.235 3.23 0 4.61-2.805 5.632-5.475 5.927.43.372.81 1.102.81 2.222 0 1.605-.015 2.895-.015 3.285 0 .322.21.698.825.577 4.77-1.587 8.205-6.083 8.205-11.385 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
      </div>
    </footer>
  );
}
