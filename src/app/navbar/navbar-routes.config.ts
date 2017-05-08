import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Angular2 Bootstrap4 Navbar', menuType: MenuType.BRAND },
  { path: 'userCat', title: 'User Categories', menuType: MenuType.LEFT },
  { path: 'location', title: 'Location Categories', menuType: MenuType.LEFT },
  { path: 'contact', title: 'Contact', menuType: MenuType.LEFT }

];
