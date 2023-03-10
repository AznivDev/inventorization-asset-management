export interface ISidebarItem {
  icon: string;
  label: string;
  to: string;
}

export const adminSidebarItems: ISidebarItem[] = [
  {
    icon: "gauge-high",
    label: "Dashboard",
    to: "/",
  },
  {
    icon: "house-laptop",
    label: "Assets",
    to: "/assets",
  },
  {
    icon: "users-viewfinder",
    label: "Users",
    to: "/users",
  },
  {
    icon: "unlock-keyhole",
    label: "Roles",
    to: "/roles",
  },
  {
    icon: "code-pull-request",
    label: "Requests",
    to: "/requests",
  },
  {
    icon: "sitemap",
    label: "Asset Types",
    to: "/types",
  },
  {
    icon: "user-tie",
    label: "Account",
    to: "/account",
  },
];

export const userSidebarItems: ISidebarItem[] = [
  {
    icon: "gauge-high",
    label: "Dashboard",
    to: "/",
  },
  {
    icon: "house-laptop",
    label: "Assets",
    to: "/assets",
  },
  {
    icon: "code-pull-request",
    label: "Requests",
    to: "/requests",
  },
  {
    icon: "user-tie",
    label: "Account",
    to: "/account",
  },
];
