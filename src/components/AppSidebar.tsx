"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

// Define type for icon keys
type IconKey = "dashboard" | "profile" | "settings" | "logout";

// Define types for props
type LinkType = {
  label: string;
  href: string;
  iconKey: IconKey;
};

type UserType = {
  name: string;
  avatar: string;
};

type AppSidebarProps = {
  links: LinkType[];
  user: UserType;
};

export function AppSidebar({ links, user }: AppSidebarProps) {
  const [open, setOpen] = useState(false);

  // Define iconMap with React.ReactNode as the value type
  const iconMap: Record<IconKey, React.ReactNode> = {
    dashboard: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    profile: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    settings: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    logout: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  };

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={{ ...link, icon: iconMap[link.iconKey] }}
              />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: user.name,
              href: "#",
              icon: (
                <Image
                  src={user.avatar}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}