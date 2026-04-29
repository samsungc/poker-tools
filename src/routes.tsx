import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Session from './pages/Session';
import Timer from './pages/Timer';
import Chips from './pages/Chips';
import BombPot from './pages/BombPot';
import NotFound from './pages/NotFound';

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Session },
      { path: 'timer', Component: Timer },
      { path: 'chips', Component: Chips },
      { path: 'bomb-pot', Component: BombPot },
      { path: '*', Component: NotFound },
    ],
  },
];
