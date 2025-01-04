import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import useVersionControlStore, {
  SampleOptions,
  SectionOptions,
} from "@/stores/sample-version-control-store";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router";

type Props = {
  children: React.ReactNode;
  side?: "left" | "right";
};

const SidebarSheet = ({ children, side = "left" }: Props) => {
  const navigate = useNavigate();

  const {
    sample,
    hero,
    navbar,
    parallax,
  }: {
    sample: SampleOptions;
    hero: SectionOptions;
    navbar: SectionOptions;
    parallax: SectionOptions;
  } = useVersionControlStore();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={side}
        className="space-y-2 overflow-x-hidden overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>
            <p className="font-bold uppercase text-lg text-black/85 dark:text-white/85">
              ShirokumaPower Sample Control Center
            </p>
          </SheetTitle>
          <SheetDescription>
            Toggles between versions of the sample
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <SidebarSheetGroup
            title="Sample Versions"
            versionList={sample.versionList}
            currentVersion={sample.version}
            itemOnClickHandler={(version) => navigate(`/version${version}`)}
          />
          <SidebarSheetGroup
            title="Hero Versions"
            versionList={hero.versionList}
            currentVersion={hero.version}
          />
          <SidebarSheetGroup
            title="Navbar Versions"
            versionList={navbar.versionList}
            currentVersion={navbar.version}
          />
          <SidebarSheetGroup
            title="Parallax Versions"
            versionList={parallax.versionList}
            currentVersion={parallax.version}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

type SidebarSheetGroupProps = {
  title: string;
  versionList: number[];
  currentVersion: number | "custom";
  level?: number;
  itemOnClickHandler?: (version: number) => void;
};

const SidebarSheetGroup = ({
  title,
  versionList,
  currentVersion,
  level = 0,
  itemOnClickHandler,
}: SidebarSheetGroupProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Separator />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn("w-full space-y-2 py-2")}
        style={{
          paddingLeft: `${level}rem`,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="uppercase font-bold text-zinc-400 text-sm">{title}</h2>
          <div className="flex items-center gap-1">
            <Switch />
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <div className="w-full border-l border-l-secondary">
            {versionList.map((version: number) => (
              <SidebarSheetGroupItem
                key={version}
                version={version}
                active={currentVersion === version}
                onClick={() =>
                  itemOnClickHandler && itemOnClickHandler(version)
                }
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

type SidebarSheetGroupItemProps = {
  version: number;
  active: boolean;
  onClick?: () => void;
};

const SidebarSheetGroupItem = ({
  version,
  active,
  onClick,
}: SidebarSheetGroupItemProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-2 px-4 py-2 rounded-tr-md rounded-br-md cursor-pointer hover:bg-secondary",
        active && "bg-secondary",
      )}
      onClick={onClick}
    >
      <p>Version {version}</p>
      {active && <Check className="w-4 h-4 pointer-events-none" />}
    </div>
  );
};

export default SidebarSheet;
