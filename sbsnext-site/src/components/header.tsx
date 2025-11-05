"use client";
import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from "next/navigation"; // Import usePathname
import { ChatHeader } from "./forked/chat-header";
import { useChatContext } from "./forked/chat";
import ContactUs from "./contact-us";
import Link from "next/link";

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Chat Bot', href: '/chat' },
]


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname(); // Get current route
  const chatContext = useChatContext();
  const isChatPage = pathname.startsWith("/chat");
  return (
    <header className="flex z-10 fixed float top-0 left-0 w-full bg-background items-center justify-between shadow-md px-2 md:px-2 gap-2 min-h-12">
      <div className="flex gap-4  items-center">
        <Link href="/"   className={`m-1.5 p-1.5 ${isChatPage ? 'hidden md:flex' : 'flex'}`}>
          <h1 className="text-2xl font-bold tracking-wide transition-colors duration-200">
            <span className="text-primary" >SBS</span>
            <span>Next</span>
          </h1>
        </Link>
        {/* Conditionally render ChatHeader when on /chat */}
        {isChatPage && <ChatHeader
          chatId={chatContext.Id}
          selectedModelId={chatContext.selectedModelId}
          selectedVisibilityType={chatContext.selectedVisibilityType}
          isReadonly={chatContext.isReadonly}
        />}
      </div>
      <div className="flex lg:hidden order-5">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-3 order-5">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className={"text-sm/6 font-semibold text-gray-900 "}>
            {item.name}
          </a>
        ))}
        <ContactUsButton className={"text-sm/6 font-semibold text-gray-900 cursor-pointer"}>

        </ContactUsButton>
      </div>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <h1 className="text-2xl font-bold tracking-wide transition-colors duration-200">
                <span className="text-primary" >SBS</span>
                <span >Next</span>
              </h1>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold"
                  >
                    {item.name}
                  </a>
                ))}
                
                <ContactUs>
                  <button className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold cursor-pointer" 
                    >
                    Contact Us
                  </button>
                </ContactUs>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

function ContactUsButton({className}: {className: string}) {
  return (
    <ContactUs>
      <button className={className}>
        Contact Us
      </button>
    </ContactUs>
  );
}
