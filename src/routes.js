import React from 'react';

const Home = React.lazy(() => import('./views/home'));
const Anime = React.lazy(() => import('./views/anime'));
const Manga = React.lazy(() => import('./views/manga'));
const Character = React.lazy(() => import('./views/character'));
const People = React.lazy(() => import('./views/people'));
const Search = React.lazy(() => import('./views/search'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/anime/:id/:title?', exact: true, name: 'Anime', component: Anime },
  { path: '/manga/:id/:title?', exact: true, name: 'Manga', component: Manga },
  { path: '/character/:id/:name?', exact: true, name: 'Character', component: Character },
  { path: '/people/:id/:name?', exact: true, name: 'People', component: People },
  { path: '/search/:type', exact: true, name: 'Search', component: Search },
];

export default routes;
