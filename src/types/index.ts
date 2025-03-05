// types/index.ts
export type IconKey = "dashboard" | "profile" | "settings" | "logout";

export type LinkType = {
  label: string;
  href: string;
  iconKey: IconKey;
};

export type UserType = {
  name: string;
  avatar: string;
};