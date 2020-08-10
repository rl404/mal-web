import React from 'react';

const Home = React.lazy(() => import('./views/home/Home'));
const AnimeDetails = React.lazy(() => import('./views/anime/details'));
const AnimeSeasonal = React.lazy(() => import('./views/anime/Seasonal'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/anime/seasonal', exact: true, name: 'Anime Seasonal', component: AnimeSeasonal },
  { path: '/anime/:id/:title?/:tab?', exact: true, name: 'Anime Details', component: AnimeDetails },
];

export default routes;
