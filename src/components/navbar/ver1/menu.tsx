import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Menu = ({ className }: Props) => {
  return (
    <NavigationMenu>
      <NavigationMenuList
        className={cn(
          "h-full space-x-2 rounded-full border border-black dark:border-white",
          className,
        )}
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-full rounded-full">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>Item One</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-full rounded-full">
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent>Item Two</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "h-full rounded-full")}
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menu;
