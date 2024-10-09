
export type SidebarNavItem = {
  icon: string,
  title: string,
  navigation:string,
  handler?: (navigation:string) => void,
}

export type SocialNavItem = {
  title: string;
  href: string;
  icon: string;
};
