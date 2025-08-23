import Link from "next/link";
import { AuthButton } from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";
import { User } from "@supabase/supabase-js/";

export default function Navigation({ user }: { user: User | null }) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="text-lg">
            JobBoard
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Browse Jobs
              </Link>

              <Link
                href="/dashboard"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
