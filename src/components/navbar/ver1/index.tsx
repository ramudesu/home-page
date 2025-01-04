import { Beaker, Globe, Mail, Moon, PanelLeftOpen, Sun } from "lucide-react";
import { ModeToggle } from "../../mode-toggle";
import { Button } from "../../ui/button";
import Menu from "./menu";
// import { SidebarTrigger } from "../../ui/sidebar";
import React from "react";
// import CustomTooltip from "../../tooltip/custom-tooltip";
import SidebarSheet from "@/components/sidebar/sidebar-sheet";

type Props = {};

const Navbar = ({}: Props) => {
  const sidebarTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleClickSidebarTriggerButton = React.useCallback(() => {
    sidebarTriggerRef.current?.click();
  }, []);

  return (
    <div className="absolute top-0 left-0 pt-3 px-10 w-full flex items-center gap-4 *:flex-shrink-0 z-50">
      <div className="h-10 flex items-center gap-x-3">
        {/* <CustomTooltip
          side="bottom"
          align="start"
          sideOffset={10}
          content={"Toggle Sidebar"}
          // className="bg-black text-white dark:bg-white dark:text-black"
        > */}
        <SidebarSheet>
          <div
            onClick={handleClickSidebarTriggerButton}
            className="hover:bg-secondary group p-1 w-10 h-10 flex items-center justify-center rounded-full border border-black dark:border-white hover:cursor-pointer"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </div>
        </SidebarSheet>
        {/* </CustomTooltip> */}
        {/* TODO: Shirokuma Logo */}
        <Button
          variant={"custom-ghost"}
          className="hover:bg-secondary group p-1 w-10 h-10 flex items-center justify-center rounded-full border border-black dark:border-white hover:cursor-pointer"
        >
          <Beaker className="w-4 h-4 group-hover:scale-105 transition" />
        </Button>
      </div>

      {/* TODO: Navigator Section */}
      <div className="h-10 flex-1 flex items-center justify-center">
        <Menu className="bg-white dark:bg-black" />
      </div>

      {/* Interactive Buttons */}
      <div className="h-10 flex items-center gap-x-3">
        <Button
          variant={"custom-ghost"}
          className="hover:bg-secondary group p-1 w-10 h-10 flex items-center justify-center rounded-full border border-black dark:border-white hover:cursor-pointer"
        >
          <Mail className="w-4 h-4 group-hover:scale-105 transition" />
        </Button>
        <ModeToggle>
          <Button
            variant={"custom-ghost"}
            className="group p-1 w-10 h-10 flex items-center justify-center rounded-full border border-black dark:border-white hover:cursor-pointer"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </ModeToggle>
        <Button
          variant={"custom-ghost"}
          className="hover:bg-secondary group p-1 w-10 h-10 flex items-center justify-center rounded-full border border-black dark:border-white hover:cursor-pointer"
        >
          <Globe className="w-4 h-4 group-hover:scale-105 transition" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
