'use client';

import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/forked/icons';
import { SidebarHistory } from '@/components/forked/sidebar-history';
import { SidebarUserNav } from '@/components/forked/sidebar-user-nav';
import { Button } from '@/components/forked/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/forked/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Session } from '@/app/session';

export function AppSidebar({ session }: { session: Session | null }) {
  const router = useRouter();
  const { open, setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 mt-14">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/chat"
              onClick={() => {
                setOpenMobile(false);
              }}
              className="flex flex-row gap-3 items-center"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Chat History
              </span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-2 h-fit"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push('/chat');
                    router.refresh();
                  }}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center" side='bottom'>New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      {open &&
        <SidebarContent >
          <SidebarHistory session={session} />
        </SidebarContent>
      }
      <SidebarFooter>{session && <SidebarUserNav session={session} />}</SidebarFooter>
    </Sidebar>
  );
}
