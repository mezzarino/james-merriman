// navigation.ts
export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Publications", href: "/publications" },
  { label: "About", href: "/about" },
  { label: "Credentials", href: "/credentials" },
  { label: "Contact", href: "/contact" },
];
