import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import useVersionControlStore, {
  SampleOptions,
  SectionOptions,
} from "@/stores/sample-version-control-store";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AppSidebar = () => {
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
    <Sidebar>
      <SidebarHeader>
        {/* TODO: ShirokumaLogo goes here */}
        <p className="font-medium text-sm text-black/85 dark:text-white/85">
          ShirokumaPower Sample Control Center
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            sample versions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sample.versionList.map((version: number) => (
                <SidebarMenuItem key={version}>
                  <SidebarMenuButton
                    asChild
                    isActive={sample.version === version}
                  >
                    <a href={`version${version}`}>Version {version}</a>
                  </SidebarMenuButton>
                  {sample.version === version && (
                    <SidebarMenuAction>
                      <Check className="w-4 h-4" />
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">navbar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbar.versionList.map((version: number) => (
                <SidebarMenuItem key={version}>
                  <SidebarMenuButton
                    asChild
                    isActive={navbar.version === version}
                  >
                    <a href={`version${version}`}>Version {version}</a>
                  </SidebarMenuButton>
                  {navbar.version === version && (
                    <SidebarMenuAction>
                      <Check className="w-4 h-4" />
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            hero section
          </SidebarGroupLabel>
          <SidebarGroupAction className="pr-4">
            <Switch checked={hero.include} onCheckedChange={() => {}} />
          </SidebarGroupAction>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {hero.versionList.map((version: number) => (
                <SidebarMenuItem key={version}>
                  <SidebarMenuButton
                    asChild
                    isActive={hero.version === version}
                  >
                    <a href={`version${version}`}>Version {version}</a>
                  </SidebarMenuButton>
                  {hero.version === version && (
                    <SidebarMenuAction>
                      <Check className="w-4 h-4" />
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            parallax section
          </SidebarGroupLabel>
          <SidebarGroupAction className="pr-4">
            <Switch checked={parallax.include} onCheckedChange={() => {}} />
          </SidebarGroupAction>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {parallax.versionList.map((version: number) => (
                <SidebarMenuItem key={version}>
                  <SidebarMenuButton
                    asChild
                    isActive={parallax.version === version}
                  >
                    <a href={`version${version}`}>Version {version}</a>
                  </SidebarMenuButton>
                  {parallax.version === version && (
                    <SidebarMenuAction>
                      <Check className="w-4 h-4" />
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">footer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-black/45 dark:text-white/45 font-medium text-xs text-center">
          Created & Designed by <span className="font-bold">ラム</span>. All
          rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
