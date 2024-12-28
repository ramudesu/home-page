import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { SectionOptions } from "@/stores/sample-version-control-store";
import { Check } from "lucide-react";

type Props = {
  section: SectionOptions;
  groupLabel: string;
};

const SectionItem = ({ section, groupLabel }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="uppercase">{groupLabel}</SidebarGroupLabel>
      <SidebarGroupAction className="pr-4">
        <Switch checked={section.include} onCheckedChange={() => {}} />
      </SidebarGroupAction>
      <SidebarGroupContent className="mt-1">
        <SidebarMenu>
          {section.versionList.map((version: number) => (
            <SidebarMenuItem key={version}>
              <SidebarMenuButton asChild isActive={section.version === version}>
                <a href={`version${version}`}>Version {version}</a>
              </SidebarMenuButton>
              {section.version === version && (
                <SidebarMenuAction>
                  <Check className="w-4 h-4" />
                </SidebarMenuAction>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SectionItem;
