'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LucideIcon,
  ChevronLeft,
  Menu,
  Loader,
  House,
  UserPen,
  LogOut,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

type NavigationProps = {
  icon?: LucideIcon | null;
  title?: string | null;
  description?: string | null;
  showLogo?: boolean | null;
  showBackButton?: boolean | null;
  isLoading?: boolean | null;
};

export default function Navigation({
  icon: Icon,
  title,
  description,
  showLogo = false,
  showBackButton,
  isLoading = false,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between border-b border-zinc-8=00 p-4">
      {showBackButton ? (
        <Button
          variant="secondary"
          className="rounded-full w-12 h-12"
          onClick={() => router.back()}
        >
          <ChevronLeft className="size-6" />
        </Button>
      ) : (
        <div className="w-8" />
      )}
      {isLoading ? (
        <Spinner icon={Loader} className="size-5" />
      ) : (
        <div className="flex flex-col items-center h-12 gap-0.5 text-center">
          {showLogo && (
            <div className="flex items-center gap-1">
              <img
                src="/pause-logo.png"
                alt="pause app logo"
                className="w-6 h-6"
              />
              <h1 className="font-semibold">Pause</h1>
            </div>
          )}

          <div className="flex items-center gap-2">
            {Icon && <Icon className="size-5" />}
            {title && <h1 className="font-semibold">{title}</h1>}
          </div>

          {description && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      {session?.user ? (
        <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <PopoverTrigger className="flex items-center justify-center rounded-full bg-secondary w-12 h-12">
            <Menu className="size-5" />
          </PopoverTrigger>
          <PopoverContent
            className="w-40 sm:w-60 p-3 space-y-0.5"
            align="end"
            sideOffset={8}
          >
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              <House />
              Home
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/profile')}
            >
              <UserPen />
              Profile
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut />
              Sign out
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="w-8" />
      )}
    </header>
  );
}
