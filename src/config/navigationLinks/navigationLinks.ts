export const siteNavItems: headerItems = [
  { link: '/game', text: 'Dashboard' },
  { link: '/results', text: 'Announcements' },
  { link: '/signout', text: 'Sign Out' },
];

export const navItems: headerItems = [
  { link: '/', text: 'Home' },
  { link: '/play', text: 'Play' },
];

export type headerItems = {
  link: string;
  text: string;
}[];
