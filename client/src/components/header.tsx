import React from 'react';
import Link from 'next/link';
import { HeaderAuth } from './HeaderAuth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/src/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Book, Pen, Users, HelpCircle } from 'lucide-react';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
      return (
          <li>
            <NavigationMenuLink asChild>
              <a
                  ref={ref}
                  className={cn(
                      'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                      className,
                  )}
                  {...props}
              >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
              </a>
            </NavigationMenuLink>
          </li>
      );
    },
);
ListItem.displayName = 'ListItem';

export default function Header() {
  return (
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-800">PoetCraft</span>
              <span className="text-sm text-gray-600">by Annie Finch</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-purple-900 p-6 no-underline outline-none focus:shadow-md"
                              href="/learn"
                          >
                            <Book className="h-6 w-6 text-white" />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">Poetry Lessons</div>
                            <p className="text-sm leading-tight text-white/90">
                              Comprehensive lessons on poetic meter, form, and technique.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/lessons/how-to-scan-a-poem" title="How to Scan a Poem">
                        Learn the fundamentals of scanning poetry and identifying meter.
                      </ListItem>
                      <ListItem href="/lessons/advanced-poetic-forms" title="Advanced Poetic Forms">
                        Explore complex poetic structures and their unique metrical patterns.
                      </ListItem>
                      <ListItem href="/resources" title="Additional Resources">
                        Access supplementary materials to enhance your learning.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/practice/scansion" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <Pen className="mr-2 h-4 w-4" /> Practice
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/community" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <Users className="mr-2 h-4 w-4" /> Community
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/faq" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <HelpCircle className="mr-2 h-4 w-4" /> FAQ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <HeaderAuth />
          </div>
        </div>
      </header>
  );
}
